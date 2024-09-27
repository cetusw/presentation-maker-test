import {Presentation, ItemSelection} from "./presentationTypes";
import {
    updatePresentationTitle,
    addNewSlide,
    removeSlides,
    updateSlideIndex,
    addTextToSlide,
    addImageToSlide,
    removeObjectFromSlide,
    updateObjectPosition,
    updateTextContent,
    updateTextFontSize,
    updateTextFontFamily,
    updateBackgroundColor,
    updateBackgroundImage,
    updateBackgroundGradient,
    updateObjectSize
} from "./presentationUtils";

// Минимальные данные
const minPresentation: Presentation = {
    id: "1",
    title: "Minimum Presentation",
    author: "Mikhail",
    createdAt: new Date("2024-09-05T00:00:00Z"),
    slides: [
        {
            id: "slide-1",
            background: {
                type: "color",
                color: "#FFFFFF"
            },
            objects: []
        }
    ]
}

const maxPresentation: Presentation = {
    id: "1",
    title: "Maximum Presentation",
    author: "Mikhail",
    createdAt: new Date("2024-09-05T00:00:00Z"),
    slides: [
        {
            id: "slide-1",
            background: {
                type: "gradient",
                firstColor: "#FF0000",
                secondColor: "#0000FF",
            },
            objects: [
                {
                    id: "text-1",
                    type: "text",
                    content: "Text on slide",
                    fontFamily: "Arial",
                    fontSize: 72,
                    position: {
                        x: 0,
                        y: 0
                    },
                    size: {
                        width: 1920,
                        height: 100
                    }
                },
                {
                    id: "image-1",
                    type: "image",
                    imageUrl: "image.png",
                    position: {
                        x: 100,
                        y: 200
                    },
                    size: {
                        width: 1024,
                        height: 768
                    }
                }
            ]
        },
        {
            id: "slide-2",
            background: {
                type: "image",
                imageUrl: "background.jpg"
            },
            objects: [
                {
                    id: "text-2",
                    type: "text",
                    content: "Text on slide",
                    fontFamily: "Times New Roman",
                    fontSize: 60,
                    position: {
                        x: 200,
                        y: 300
                    },
                    size: {
                        width: 1600,
                        height: 90
                    }
                },
                {
                    id: "image-2",
                    type: "image",
                    imageUrl: "image.jpg",
                    position: {
                        x: 500,
                        y: 500
                    },
                    size: {
                        width: 1280,
                        height: 1024
                    }
                }
            ]
        }
    ]
};

const newSelectedItems: ItemSelection = {
    selectedSlidesIds: ['slide-1'],
    selectedObjectsIds: ['text-1'],
}

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ####################");
console.log(minPresentation);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ####################");
console.log(maxPresentation);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updatePresentationTitle ####################");
console.log(minPresentation);
let updatedPresentation = updatePresentationTitle(minPresentation, 'new title');
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updatePresentationTitle ####################");
console.log(updatedPresentation);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updatePresentationTitle ####################");
console.log(maxPresentation);
updatedPresentation = updatePresentationTitle(maxPresentation, 'new title');
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updatePresentationTitle ####################");
console.log(updatedPresentation);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО addNewSlide ####################");
console.log(minPresentation);
updatedPresentation = addNewSlide(minPresentation);
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ addNewSlide ####################");
console.log(updatedPresentation);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО addNewSlide ####################");
console.log(maxPresentation);
updatedPresentation = addNewSlide(maxPresentation);
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ addNewSlide ####################");
console.log(updatedPresentation);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО removeSlides ####################");
console.log(minPresentation);
updatedPresentation = removeSlides(minPresentation, newSelectedItems);
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ removeSlides ####################");
console.log(updatedPresentation);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО removeSlides ####################");
console.log(maxPresentation);
updatedPresentation = removeSlides(maxPresentation, newSelectedItems);
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ removeSlides ####################");
console.log(updatedPresentation);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateSlideIndex ####################");
console.log(minPresentation);
updatedPresentation = updateSlideIndex(minPresentation, newSelectedItems, 2);
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateSlideIndex ####################");
console.log(updatedPresentation);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateSlideIndex ####################");
console.log(maxPresentation);
updatedPresentation = updateSlideIndex(maxPresentation, newSelectedItems, 2);
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateSlideIndex ####################");
console.log(updatedPresentation);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО addTextToSlide ####################");
console.log(minPresentation.slides[0].objects);
updatedPresentation = addTextToSlide(minPresentation, newSelectedItems);
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ addTextToSlide ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО addTextToSlide ####################");
console.log(maxPresentation.slides[0].objects);
updatedPresentation = addTextToSlide(maxPresentation, newSelectedItems);
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ addTextToSlide ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО removeObjectFromSlide ####################");
console.log(minPresentation.slides);
updatedPresentation = removeObjectFromSlide(minPresentation, newSelectedItems);
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ removeObjectFromSlide ####################");
console.log(updatedPresentation.slides);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО removeObjectFromSlide ####################");
console.log(maxPresentation.slides);
updatedPresentation = removeObjectFromSlide(maxPresentation, newSelectedItems);
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ removeObjectFromSlide ####################");
console.log(updatedPresentation.slides);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО addImageToSlide ####################");
console.log(minPresentation.slides[0].objects);
updatedPresentation = addImageToSlide(minPresentation, newSelectedItems, '/url');
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ addImageToSlide ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО addImageToSlide ####################");
console.log(maxPresentation.slides[0].objects);
updatedPresentation = addImageToSlide(maxPresentation, newSelectedItems, '/url');
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ addImageToSlide ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateObjectPosition ####################");
console.log(minPresentation.slides[0].objects);
updatedPresentation = updateObjectPosition(minPresentation, newSelectedItems, {x: 1, y: 1});
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateObjectPosition ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateObjectPosition ####################");
console.log(maxPresentation.slides[0].objects);
updatedPresentation = updateObjectPosition(maxPresentation, newSelectedItems, {x: 1, y: 1});
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateObjectPosition ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateObjectPosition ####################");
console.log(minPresentation.slides[0].objects);
updatedPresentation = updateObjectSize(minPresentation, newSelectedItems, {width: 1, height: 1});
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateObjectPosition ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateObjectPosition ####################");
console.log(maxPresentation.slides[0].objects);
updatedPresentation = updateObjectSize(maxPresentation, newSelectedItems, {width: 1, height: 1});
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateObjectPosition ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateTextContent ####################");
console.log(minPresentation.slides[0].objects);
updatedPresentation = updateTextContent(minPresentation, newSelectedItems, 'super new text');
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateTextContent ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateTextContent ####################");
console.log(maxPresentation.slides[0].objects);
updatedPresentation = updateTextContent(maxPresentation, newSelectedItems, 'super new text');
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateTextContent ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateTextFontSize ####################");
console.log(minPresentation.slides[0].objects);
updatedPresentation = updateTextFontSize(minPresentation, newSelectedItems, 30);
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateTextFontSize ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateTextFontSize ####################");
console.log(maxPresentation.slides[0].objects);
updatedPresentation = updateTextFontSize(maxPresentation, newSelectedItems, 30);
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateTextFontSize ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateTextFontFamily ####################");
console.log(minPresentation.slides[0].objects);
updatedPresentation = updateTextFontFamily(minPresentation, newSelectedItems, 'Montserrat');
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateTextFontFamily ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateTextFontFamily ####################");
console.log(maxPresentation.slides[0].objects);
updatedPresentation = updateTextFontFamily(maxPresentation, newSelectedItems, 'Montserrat');
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateTextFontFamily ####################");
console.log(updatedPresentation.slides[0].objects);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateBackgroundColor ####################");
console.log(minPresentation.slides[0]);
updatedPresentation = updateBackgroundColor(minPresentation, newSelectedItems, '#000000');
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateBackgroundColor ####################");
console.log(updatedPresentation.slides[0]);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateBackgroundColor ####################");
console.log(maxPresentation.slides[0]);
updatedPresentation = updateBackgroundColor(maxPresentation, newSelectedItems, '#000000');
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateBackgroundColor ####################");
console.log(updatedPresentation.slides[0]);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateBackgroundImage ####################");
console.log(minPresentation.slides[0]);
updatedPresentation = updateBackgroundImage(minPresentation, newSelectedItems, '/new-url');
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateBackgroundImage ####################");
console.log(updatedPresentation.slides[0]);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateBackgroundImage ####################");
console.log(maxPresentation.slides[0]);
updatedPresentation = updateBackgroundImage(maxPresentation, newSelectedItems, '/new-url');
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateBackgroundImage ####################");
console.log(updatedPresentation.slides[0]);

console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateBackgroundGradient ####################");
console.log(minPresentation.slides[0]);
updatedPresentation = updateBackgroundGradient(minPresentation, newSelectedItems, '#123456', '#654321');
console.log("\n#################### МИНИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateBackgroundGradient ####################");
console.log(updatedPresentation.slides[0]);

console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ДО updateBackgroundGradient ####################");
console.log(maxPresentation.slides[0]);
updatedPresentation = updateBackgroundGradient(maxPresentation, newSelectedItems, '#123456', '#654321');
console.log("\n#################### МАКСИМАЛЬНАЯ ПРЕЗЕНТАЦИЯ ПОСЛЕ updateBackgroundGradient ####################");
console.log(updatedPresentation.slides[0]);