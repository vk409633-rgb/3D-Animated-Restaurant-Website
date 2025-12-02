# Restaurant Image Downloader Script
# This script downloads all 39 restaurant images from Unsplash

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Restaurant Image Downloader" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create images directory if it doesn't exist
$imagesDir = ".\images"
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
    Write-Host "✓ Created images directory" -ForegroundColor Green
} else {
    Write-Host "✓ Images directory exists" -ForegroundColor Green
}

# Define all images with their Unsplash search queries
$images = @(
    # Starters
    @{name="scallops.jpg"; query="scallops+fine+dining"; desc="Pan-seared scallops"},
    @{name="foie-gras.jpg"; query="foie+gras+terrine"; desc="Foie gras terrine"},
    @{name="burrata.jpg"; query="burrata+tomatoes"; desc="Burrata with tomatoes"},
    @{name="tuna-tartare.jpg"; query="tuna+tartare"; desc="Tuna tartare"},
    @{name="mushroom-risotto.jpg"; query="mushroom+risotto"; desc="Wild mushroom risotto"},
    @{name="oysters.jpg"; query="oysters+rockefeller"; desc="Oysters Rockefeller"},
    
    # Mains
    @{name="wagyu.jpg"; query="wagyu+beef+steak"; desc="Wagyu beef tenderloin"},
    @{name="sea-bass.jpg"; query="sea+bass+fine+dining"; desc="Pan-roasted sea bass"},
    @{name="duck.jpg"; query="duck+breast+orange"; desc="Duck breast à l'orange"},
    @{name="lobster.jpg"; query="lobster+thermidor"; desc="Lobster thermidor"},
    @{name="lamb.jpg"; query="rack+of+lamb"; desc="Rack of lamb"},
    @{name="wellington.jpg"; query="vegetable+wellington"; desc="Vegetable wellington"},
    
    # Desserts
    @{name="souffle.jpg"; query="chocolate+souffle"; desc="Chocolate soufflé"},
    @{name="creme-brulee.jpg"; query="creme+brulee"; desc="Crème brûlée"},
    @{name="tarte-tatin.jpg"; query="tarte+tatin"; desc="Tarte tatin"},
    @{name="tiramisu.jpg"; query="tiramisu+dessert"; desc="Tiramisu"},
    @{name="lemon-tart.jpg"; query="lemon+tart"; desc="Lemon tart"},
    @{name="cheese.jpg"; query="cheese+board+artisan"; desc="Artisan cheese board"},
    
    # Drinks
    @{name="wine-red.jpg"; query="red+wine+bottle"; desc="Red wine"},
    @{name="champagne.jpg"; query="champagne+bottle"; desc="Champagne"},
    @{name="wine-white.jpg"; query="white+wine+bottle"; desc="White wine"},
    @{name="cocktail.jpg"; query="signature+cocktail"; desc="Signature cocktail"},
    @{name="beer.jpg"; query="craft+beer"; desc="Craft beer"},
    @{name="coffee.jpg"; query="artisan+coffee"; desc="Artisan coffee"},
    
    # Events
    @{name="wine-tasting.jpg"; query="wine+tasting+event"; desc="Wine tasting event"},
    @{name="chef-special.jpg"; query="chef+plating+gourmet"; desc="Chef's special"},
    @{name="private-dining.jpg"; query="private+dining+room+luxury"; desc="Private dining room"},
    
    # Gallery
    @{name="gallery-1.jpg"; query="wagyu+steak+plating"; desc="Signature wagyu dish"},
    @{name="gallery-2.jpg"; query="fine+dining+restaurant+interior"; desc="Main dining area"},
    @{name="gallery-3.jpg"; query="gourmet+dessert+plating"; desc="Artisan dessert"},
    @{name="gallery-4.jpg"; query="luxury+private+dining+room"; desc="Private dining room"},
    @{name="gallery-5.jpg"; query="chef+cooking+kitchen"; desc="Chef at work"},
    @{name="gallery-6.jpg"; query="fresh+seafood+display"; desc="Fresh seafood"},
    @{name="gallery-7.jpg"; query="restaurant+bar+lounge"; desc="Bar and lounge"},
    @{name="gallery-8.jpg"; query="wine+cellar+luxury"; desc="Wine cellar"},
    @{name="gallery-9.jpg"; query="fine+dining+food+close+up"; desc="Plating perfection"},
    @{name="gallery-10.jpg"; query="fresh+ingredients+vegetables"; desc="Fresh ingredients"},
    @{name="gallery-11.jpg"; query="elegant+table+setting"; desc="Elegant table setting"},
    @{name="gallery-12.jpg"; query="gourmet+dish+presentation"; desc="Gourmet presentation"}
)

Write-Host ""
Write-Host "Starting download of $($images.Count) images..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($img in $images) {
    $filePath = Join-Path $imagesDir $img.name
    $url = "https://source.unsplash.com/800x600/?$($img.query)"
    
    Write-Host "[$($images.IndexOf($img) + 1)/$($images.Count)] Downloading: $($img.name)" -ForegroundColor Cyan
    Write-Host "    Description: $($img.desc)" -ForegroundColor Gray
    
    try {
        # Download the image
        Invoke-WebRequest -Uri $url -OutFile $filePath -UseBasicParsing
        
        # Check if file was created and has content
        if ((Test-Path $filePath) -and ((Get-Item $filePath).Length -gt 0)) {
            $fileSize = [math]::Round((Get-Item $filePath).Length / 1KB, 2)
            Write-Host "    ✓ Success! ($fileSize KB)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "    ✗ Failed: File is empty" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "    ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
    
    # Wait 500ms between downloads to avoid rate limiting
    Start-Sleep -Milliseconds 500
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Download Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✓ Successfully downloaded: $successCount images" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "✗ Failed downloads: $failCount images" -ForegroundColor Red
}
Write-Host ""
Write-Host "Images saved to: $((Resolve-Path $imagesDir).Path)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Open index.html in your browser" -ForegroundColor White
Write-Host "2. Verify all images are displaying correctly" -ForegroundColor White
Write-Host "3. Enjoy your beautiful restaurant website! 🍽️" -ForegroundColor White
Write-Host ""
