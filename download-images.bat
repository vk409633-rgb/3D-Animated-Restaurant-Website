@echo off
echo ========================================
echo   Restaurant Image Downloader
echo ========================================
echo.

REM Create images directory
if not exist "images" (
    mkdir images
    echo Created images directory
)

echo.
echo Downloading images from Unsplash...
echo This will take about 2-3 minutes.
echo.

REM Download images using curl (built into Windows 10+)
curl -L "https://source.unsplash.com/800x600/?scallops+fine+dining" -o "images/scallops.jpg"
echo [1/39] Downloaded scallops.jpg

curl -L "https://source.unsplash.com/800x600/?foie+gras+terrine" -o "images/foie-gras.jpg"
echo [2/39] Downloaded foie-gras.jpg

curl -L "https://source.unsplash.com/800x600/?burrata+tomatoes" -o "images/burrata.jpg"
echo [3/39] Downloaded burrata.jpg

curl -L "https://source.unsplash.com/800x600/?tuna+tartare" -o "images/tuna-tartare.jpg"
echo [4/39] Downloaded tuna-tartare.jpg

curl -L "https://source.unsplash.com/800x600/?mushroom+risotto" -o "images/mushroom-risotto.jpg"
echo [5/39] Downloaded mushroom-risotto.jpg

curl -L "https://source.unsplash.com/800x600/?oysters+rockefeller" -o "images/oysters.jpg"
echo [6/39] Downloaded oysters.jpg

curl -L "https://source.unsplash.com/800x600/?wagyu+beef+steak" -o "images/wagyu.jpg"
echo [7/39] Downloaded wagyu.jpg

curl -L "https://source.unsplash.com/800x600/?sea+bass+fine+dining" -o "images/sea-bass.jpg"
echo [8/39] Downloaded sea-bass.jpg

curl -L "https://source.unsplash.com/800x600/?duck+breast+orange" -o "images/duck.jpg"
echo [9/39] Downloaded duck.jpg

curl -L "https://source.unsplash.com/800x600/?lobster+thermidor" -o "images/lobster.jpg"
echo [10/39] Downloaded lobster.jpg

curl -L "https://source.unsplash.com/800x600/?rack+of+lamb" -o "images/lamb.jpg"
echo [11/39] Downloaded lamb.jpg

curl -L "https://source.unsplash.com/800x600/?vegetable+wellington" -o "images/wellington.jpg"
echo [12/39] Downloaded wellington.jpg

curl -L "https://source.unsplash.com/800x600/?chocolate+souffle" -o "images/souffle.jpg"
echo [13/39] Downloaded souffle.jpg

curl -L "https://source.unsplash.com/800x600/?creme+brulee" -o "images/creme-brulee.jpg"
echo [14/39] Downloaded creme-brulee.jpg

curl -L "https://source.unsplash.com/800x600/?tarte+tatin" -o "images/tarte-tatin.jpg"
echo [15/39] Downloaded tarte-tatin.jpg

curl -L "https://source.unsplash.com/800x600/?tiramisu+dessert" -o "images/tiramisu.jpg"
echo [16/39] Downloaded tiramisu.jpg

curl -L "https://source.unsplash.com/800x600/?lemon+tart" -o "images/lemon-tart.jpg"
echo [17/39] Downloaded lemon-tart.jpg

curl -L "https://source.unsplash.com/800x600/?cheese+board+artisan" -o "images/cheese.jpg"
echo [18/39] Downloaded cheese.jpg

curl -L "https://source.unsplash.com/800x600/?red+wine+bottle" -o "images/wine-red.jpg"
echo [19/39] Downloaded wine-red.jpg

curl -L "https://source.unsplash.com/800x600/?champagne+bottle" -o "images/champagne.jpg"
echo [20/39] Downloaded champagne.jpg

curl -L "https://source.unsplash.com/800x600/?white+wine+bottle" -o "images/wine-white.jpg"
echo [21/39] Downloaded wine-white.jpg

curl -L "https://source.unsplash.com/800x600/?signature+cocktail" -o "images/cocktail.jpg"
echo [22/39] Downloaded cocktail.jpg

curl -L "https://source.unsplash.com/800x600/?craft+beer" -o "images/beer.jpg"
echo [23/39] Downloaded beer.jpg

curl -L "https://source.unsplash.com/800x600/?artisan+coffee" -o "images/coffee.jpg"
echo [24/39] Downloaded coffee.jpg

curl -L "https://source.unsplash.com/800x600/?wine+tasting+event" -o "images/wine-tasting.jpg"
echo [25/39] Downloaded wine-tasting.jpg

curl -L "https://source.unsplash.com/800x600/?chef+plating+gourmet" -o "images/chef-special.jpg"
echo [26/39] Downloaded chef-special.jpg

curl -L "https://source.unsplash.com/800x600/?private+dining+room+luxury" -o "images/private-dining.jpg"
echo [27/39] Downloaded private-dining.jpg

curl -L "https://source.unsplash.com/800x600/?wagyu+steak+plating" -o "images/gallery-1.jpg"
echo [28/39] Downloaded gallery-1.jpg

curl -L "https://source.unsplash.com/800x600/?fine+dining+restaurant+interior" -o "images/gallery-2.jpg"
echo [29/39] Downloaded gallery-2.jpg

curl -L "https://source.unsplash.com/800x600/?gourmet+dessert+plating" -o "images/gallery-3.jpg"
echo [30/39] Downloaded gallery-3.jpg

curl -L "https://source.unsplash.com/800x600/?luxury+private+dining+room" -o "images/gallery-4.jpg"
echo [31/39] Downloaded gallery-4.jpg

curl -L "https://source.unsplash.com/800x600/?chef+cooking+kitchen" -o "images/gallery-5.jpg"
echo [32/39] Downloaded gallery-5.jpg

curl -L "https://source.unsplash.com/800x600/?fresh+seafood+display" -o "images/gallery-6.jpg"
echo [33/39] Downloaded gallery-6.jpg

curl -L "https://source.unsplash.com/800x600/?restaurant+bar+lounge" -o "images/gallery-7.jpg"
echo [34/39] Downloaded gallery-7.jpg

curl -L "https://source.unsplash.com/800x600/?wine+cellar+luxury" -o "images/gallery-8.jpg"
echo [35/39] Downloaded gallery-8.jpg

curl -L "https://source.unsplash.com/800x600/?fine+dining+food+close+up" -o "images/gallery-9.jpg"
echo [36/39] Downloaded gallery-9.jpg

curl -L "https://source.unsplash.com/800x600/?fresh+ingredients+vegetables" -o "images/gallery-10.jpg"
echo [37/39] Downloaded gallery-10.jpg

curl -L "https://source.unsplash.com/800x600/?elegant+table+setting" -o "images/gallery-11.jpg"
echo [38/39] Downloaded gallery-11.jpg

curl -L "https://source.unsplash.com/800x600/?gourmet+dish+presentation" -o "images/gallery-12.jpg"
echo [39/39] Downloaded gallery-12.jpg

echo.
echo ========================================
echo   Download Complete!
echo ========================================
echo.
echo All 39 images have been downloaded to the images folder.
echo.
echo Next steps:
echo 1. Open index.html in your browser
echo 2. Verify all images are displaying correctly
echo 3. Enjoy your beautiful restaurant website!
echo.
pause
