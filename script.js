// unsplash API
// `` is a template string
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// array
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
const count = 30;
const apiKey = '-2Yp7EZ3nfyp9Cc8N9dyR-DbHEbo_BmDQ34zm1-eFUs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// create helper function to set attributes
// to review
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    console.log('image loaded');
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // create elements for links, photos, add to DOM
    // RUN FUNCTION FOR EACH OBJECT IN PHOTOS ARRAY
    photosArray.forEach((photo) => {
        // create <a> element to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',

        });
        // item.setAttribute('href', photo.links.html);
        // // blank opens it in a new tab
        // item.setAttribute('target', '_blank');
        // // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        });
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        // put <img> inside <a> then put both inside imageContainer element
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded())
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        // console.log(photosArary);
    }
    catch (error) {
        // catch error
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
    }
})
getPhotos()