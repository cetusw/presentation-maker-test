import {Presentation, Slide, SlideObject, Background, SlideCollection, ItemSelection, ImageObject, TextObject, Position, Size} from "./presentationTypes";
import {defaultColor, defaultFontFamily, defaultFontSize, defaultPosition, defaultSize, defaultText} from "./constants";
import {updatePresentationTitle, addNewSlide, removeSlides, updateSlideIndex, addTextToSlide, addImageToSlide, removeObjectFromSlide, updateObjectPosition, updateObjectSize, updateTextContent, updateTextFontSize, updateTextFontFamily, updateBackgroundColor, updateBackgroundImage, updateBackgroundGradient} from "./presentationUtils";


const testPresentation: Presentation = {
    id: '1',
    title: 'Test Presentation',
    author: 'Mikhail',
    createdAt: new Date('2024-09-05T00:00:00Z'),
    slides: [
        {
            id: 'slide-1',
            background: {
                type: 'color',
                color: defaultColor,
            },
            objects: [
                {
                    id: 'text-1',
                    type: 'text',
                    content: 'Test Presentation',
                    fontFamily: 'Arial',
                    fontSize: 24,
                    position: { x: 100, y: 50 },
                    size: { width: 400, height: 50 },
                },
                {
                    id: 'image-1',
                    type: 'image',
                    imageUrl: '',
                    position: { x: 50, y: 150 },
                    size: { width: 200, height: 150 },
                },
            ],
        },
        {
            id: 'slide-2',
            background: {
                type: 'image',
                imageUrl: '',
            },
            objects: [
                {
                    id: 'text-1',
                    type: 'text',
                    content: 'Test Presentation',
                    fontFamily: 'Arial',
                    fontSize: 30,
                    position: { x: 80, y: 70 },
                    size: { width: 350, height: 60 },
                },
            ],
        },
    ],
};

const newSelectedItems: ItemSelection = {
    selectedSlidesIds: ['slide-1'],
    selectedObjectsIds: ['image-1', 'text-1'],
}

console.log(testPresentation.slides[0]);

// let updatedPresentation = updatePresentationTitle(testPresentation, 'new title')
// console.log(updatedPresentation)
//
let updatedPresentation = addNewSlide(testPresentation)
console.log(updatedPresentation)

// let updatedPresentation = removeSlides(testPresentation, newSelectedItems)
// console.log(updatedPresentation);

// let updatedPresentation = updateSlideIndex(testPresentation, newSelectedItems, 2);
// console.log(updatedPresentation);

// let updatedPresentation = addTextToSlide(testPresentation, newSelectedItems);
// console.log(updatedPresentation.slides[0].objects);

// let updatedPresentation = removeObjectFromSlide(testPresentation, newSelectedItems)
// console.log(updatedPresentation.slides)

// let updatedPresentation = addImageToSlide(testPresentation, newSelectedItems, '/url')
// console.log(updatedPresentation.slides[0].objects)

// let updatedPresentation = updateObjectPosition(testPresentation, newSelectedItems, 1, 1)
// console.log(updatedPresentation.slides[0].objects)

// let updatedPresentation = updateTextContent(testPresentation, newSelectedItems, 'super new text')
// console.log(updatedPresentation.slides[0].objects)

// let updatedPresentation = updateTextFontSize(testPresentation, newSelectedItems, 30)
// console.log(updatedPresentation.slides[0].objects)

// let updatedPresentation = updateTextFontFamily(testPresentation, newSelectedItems, 'Montserrat')
// console.log(updatedPresentation.slides[0].objects)

// let updatedPresentation = updateBackgroundColor(testPresentation, newSelectedItems, '#000000')
// console.log(updatedPresentation.slides[0])

// let updatedPresentation = updateBackgroundImage(testPresentation, newSelectedItems, '/new-url')
// console.log(updatedPresentation.slides[0])

//let updatedPresentation = updateBackgroundGradient(testPresentation, newSelectedItems, '#123456', '#654321')
//console.log(updatedPresentation.slides[0])