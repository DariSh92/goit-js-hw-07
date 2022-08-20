import { galleryItems } from './gallery-items.js';
// // Change code below this line

const galleryEl = document.querySelector(".gallery");
const elMarkup = createPhotoCardsMarkup(galleryItems);
galleryEl.insertAdjacentHTML('beforeend', elMarkup);

let instance = null;

function createPhotoCardsMarkup(elements) {
    return elements.map(({ preview, original, description }) => { 
        return `<div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div>`;
        
    }).join(""); 
}

function noCroosToAnotherPage(evt) {
  evt.preventDefault();
}

galleryEl.addEventListener('click', onGalleryElClick);

function onGalleryElClick(evt) {
   noCroosToAnotherPage(evt) 
    if (!evt.target.classList.contains("gallery__image")) {
        return;
    }
    onModalOpen(evt);
}

function onEscapePress(evt) {
    const isEscKey = evt.code === "Escape";
    if (isEscKey) {
        onModalClose();
    }
}


function onModalOpen(evt) {
    window.addEventListener('keydown', onEscapePress);
    instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
`)

    instance.show()   
}


function onModalClose() {
    window.removeEventListener('keydown', onEscapePress);

    instance.close();
}




