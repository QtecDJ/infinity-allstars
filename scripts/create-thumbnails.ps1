# PowerShell Script to create thumbnail versions of gallery images
# This reduces file sizes for faster loading in the gallery preview

Write-Host "Starting thumbnail generation..." -ForegroundColor Green

# Load System.Drawing assembly
Add-Type -AssemblyName System.Drawing

# Define source and thumbnail directories
$sourceDir = Join-Path $PSScriptRoot "..\public\media"
$folders = @("tsv", "fasching")

# Thumbnail dimensions
$thumbnailWidth = 640
$thumbnailHeight = 480

function Create-Thumbnail {
    param (
        [string]$sourcePath,
        [string]$destinationPath,
        [int]$maxWidth,
        [int]$maxHeight
    )
    
    try {
        # Load the source image
        $sourceImage = [System.Drawing.Image]::FromFile($sourcePath)
        
        # Calculate new dimensions while maintaining aspect ratio
        $ratioX = $maxWidth / $sourceImage.Width
        $ratioY = $maxHeight / $sourceImage.Height
        $ratio = [Math]::Min($ratioX, $ratioY)
        
        $newWidth = [int]($sourceImage.Width * $ratio)
        $newHeight = [int]($sourceImage.Height * $ratio)
        
        # Create the thumbnail
        $thumbnail = New-Object System.Drawing.Bitmap $newWidth, $newHeight
        $graphics = [System.Drawing.Graphics]::FromImage($thumbnail)
        
        # Set high quality rendering
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        # Draw the image
        $graphics.DrawImage($sourceImage, 0, 0, $newWidth, $newHeight)
        
        # Save with JPEG quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, 85)
        
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | 
            Where-Object { $_.MimeType -eq "image/jpeg" }
        
        # Save the thumbnail
        $thumbnail.Save($destinationPath, $jpegCodec, $encoderParams)
        
        # Cleanup
        $graphics.Dispose()
        $thumbnail.Dispose()
        $sourceImage.Dispose()
        
        return $true
    }
    catch {
        Write-Host "Error processing $sourcePath : $_" -ForegroundColor Red
        return $false
    }
}

# Process each folder
foreach ($folder in $folders) {
    $folderPath = Join-Path $sourceDir $folder
    $thumbFolder = Join-Path $folderPath "thumbs"
    
    # Create thumbs folder if it doesn't exist
    if (-not (Test-Path $thumbFolder)) {
        New-Item -ItemType Directory -Path $thumbFolder | Out-Null
        Write-Host "Created thumbs folder: $thumbFolder" -ForegroundColor Cyan
    }
    
    # Get all images in the folder
    $images = Get-ChildItem -Path $folderPath -File | Where-Object { 
        $_.Extension -match '\.(jpg|jpeg|png|JPG|JPEG|PNG)$' 
    }
    
    Write-Host "`nProcessing $($images.Count) images in $folder..." -ForegroundColor Yellow
    
    $processed = 0
    $skipped = 0
    
    foreach ($image in $images) {
        $thumbPath = Join-Path $thumbFolder $image.Name
        
        # Skip if thumbnail already exists and is newer than source
        if ((Test-Path $thumbPath) -and 
            ((Get-Item $thumbPath).LastWriteTime -gt $image.LastWriteTime)) {
            $skipped++
            Write-Host "  Skipping (up to date): $($image.Name)" -ForegroundColor Gray
            continue
        }
        
        Write-Host "  Creating thumbnail: $($image.Name)" -ForegroundColor White
        
        if (Create-Thumbnail -sourcePath $image.FullName -destinationPath $thumbPath `
            -maxWidth $thumbnailWidth -maxHeight $thumbnailHeight) {
            
            $originalSize = [math]::Round($image.Length / 1KB, 2)
            $thumbSize = [math]::Round((Get-Item $thumbPath).Length / 1KB, 2)
            $savings = [math]::Round((1 - ($thumbSize / $originalSize)) * 100, 1)
            
            Write-Host "    Original: $($originalSize) KB -> Thumbnail: $($thumbSize) KB (Saved $savings%)" -ForegroundColor Green
            $processed++
        }
    }
    
    Write-Host "`nFolder $folder - Processed: $processed, Skipped: $skipped" -ForegroundColor Cyan
}

Write-Host "`nThumbnail generation complete!" -ForegroundColor Green
Write-Host "Next step: Update Gallery.tsx to use thumbnail paths for preview images." -ForegroundColor Yellow
