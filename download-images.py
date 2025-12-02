import urllib.request
import time
import os

print("=" * 50)
print("  Restaurant Image Downloader")
print("=" * 50)
print()

# Create images directory
if not os.path.exists('images'):
    os.makedirs('images')
    print("✓ Created images directory")
else:
    print("✓ Images directory exists")

# Define all images
images = [
    # Starters
    {'name': 'scallops.jpg', 'query': 'scallops fine dining', 'desc': 'Pan-seared scallops'},
    {'name': 'foie-gras.jpg', 'query': 'foie gras terrine', 'desc': 'Foie gras terrine'},
    {'name': 'burrata.jpg', 'query': 'burrata tomatoes', 'desc': 'Burrata with tomatoes'},
    {'name': 'tuna-tartare.jpg', 'query': 'tuna tartare', 'desc': 'Tuna tartare'},
    {'name': 'mushroom-risotto.jpg', 'query': 'mushroom risotto', 'desc': 'Wild mushroom risotto'},
    {'name': 'oysters.jpg', 'query': 'oysters rockefeller', 'desc': 'Oysters Rockefeller'},
    
    # Mains
    {'name': 'wagyu.jpg', 'query': 'wagyu beef steak', 'desc': 'Wagyu beef tenderloin'},
    {'name': 'sea-bass.jpg', 'query': 'sea bass fine dining', 'desc': 'Pan-roasted sea bass'},
    {'name': 'duck.jpg', 'query': 'duck breast orange', 'desc': 'Duck breast à l\'orange'},
    {'name': 'lobster.jpg', 'query': 'lobster thermidor', 'desc': 'Lobster thermidor'},
    {'name': 'lamb.jpg', 'query': 'rack of lamb', 'desc': 'Rack of lamb'},
    {'name': 'wellington.jpg', 'query': 'vegetable wellington', 'desc': 'Vegetable wellington'},
    
    # Desserts
    {'name': 'souffle.jpg', 'query': 'chocolate souffle', 'desc': 'Chocolate soufflé'},
    {'name': 'creme-brulee.jpg', 'query': 'creme brulee', 'desc': 'Crème brûlée'},
    {'name': 'tarte-tatin.jpg', 'query': 'tarte tatin', 'desc': 'Tarte tatin'},
    {'name': 'tiramisu.jpg', 'query': 'tiramisu dessert', 'desc': 'Tiramisu'},
    {'name': 'lemon-tart.jpg', 'query': 'lemon tart', 'desc': 'Lemon tart'},
    {'name': 'cheese.jpg', 'query': 'cheese board artisan', 'desc': 'Artisan cheese board'},
    
    # Drinks
    {'name': 'wine-red.jpg', 'query': 'red wine bottle', 'desc': 'Red wine'},
    {'name': 'champagne.jpg', 'query': 'champagne bottle', 'desc': 'Champagne'},
    {'name': 'wine-white.jpg', 'query': 'white wine bottle', 'desc': 'White wine'},
    {'name': 'cocktail.jpg', 'query': 'signature cocktail', 'desc': 'Signature cocktail'},
    {'name': 'beer.jpg', 'query': 'craft beer', 'desc': 'Craft beer'},
    {'name': 'coffee.jpg', 'query': 'artisan coffee', 'desc': 'Artisan coffee'},
    
    # Events
    {'name': 'wine-tasting.jpg', 'query': 'wine tasting event', 'desc': 'Wine tasting event'},
    {'name': 'chef-special.jpg', 'query': 'chef plating gourmet', 'desc': 'Chef\'s special'},
    {'name': 'private-dining.jpg', 'query': 'private dining room luxury', 'desc': 'Private dining room'},
    
    # Gallery
    {'name': 'gallery-1.jpg', 'query': 'wagyu steak plating', 'desc': 'Signature wagyu dish'},
    {'name': 'gallery-2.jpg', 'query': 'fine dining restaurant interior', 'desc': 'Main dining area'},
    {'name': 'gallery-3.jpg', 'query': 'gourmet dessert plating', 'desc': 'Artisan dessert'},
    {'name': 'gallery-4.jpg', 'query': 'luxury private dining room', 'desc': 'Private dining room'},
    {'name': 'gallery-5.jpg', 'query': 'chef cooking kitchen', 'desc': 'Chef at work'},
    {'name': 'gallery-6.jpg', 'query': 'fresh seafood display', 'desc': 'Fresh seafood'},
    {'name': 'gallery-7.jpg', 'query': 'restaurant bar lounge', 'desc': 'Bar and lounge'},
    {'name': 'gallery-8.jpg', 'query': 'wine cellar luxury', 'desc': 'Wine cellar'},
    {'name': 'gallery-9.jpg', 'query': 'fine dining food close up', 'desc': 'Plating perfection'},
    {'name': 'gallery-10.jpg', 'query': 'fresh ingredients vegetables', 'desc': 'Fresh ingredients'},
    {'name': 'gallery-11.jpg', 'query': 'elegant table setting', 'desc': 'Elegant table setting'},
    {'name': 'gallery-12.jpg', 'query': 'gourmet dish presentation', 'desc': 'Gourmet presentation'}
]

print()
print(f"Starting download of {len(images)} images...")
print()

success_count = 0
fail_count = 0

for i, img in enumerate(images, 1):
    file_path = os.path.join('images', img['name'])
    query = img['query'].replace(' ', '+')
    url = f"https://source.unsplash.com/800x600/?{query}"
    
    print(f"[{i}/{len(images)}] Downloading: {img['name']}")
    print(f"    Description: {img['desc']}")
    
    try:
        # Download with proper redirect handling
        urllib.request.urlretrieve(url, file_path)
        
        # Check file size
        file_size = os.path.getsize(file_path)
        if file_size > 10000:  # At least 10KB
            print(f"    ✓ Success! ({file_size // 1024} KB)")
            success_count += 1
        else:
            print(f"    ✗ Failed: File too small ({file_size} bytes)")
            fail_count += 1
    except Exception as e:
        print(f"    ✗ Failed: {str(e)}")
        fail_count += 1
    
    # Wait between downloads
    if i < len(images):
        time.sleep(0.5)
    print()

print("=" * 50)
print("  Download Complete!")
print("=" * 50)
print()
print(f"✓ Successfully downloaded: {success_count} images")
if fail_count > 0:
    print(f"✗ Failed downloads: {fail_count} images")
print()
print(f"Images saved to: {os.path.abspath('images')}")
print()
print("Next steps:")
print("1. Open index.html in your browser")
print("2. Verify all images are displaying correctly")
print("3. Enjoy your beautiful restaurant website! 🍽️")
print()
