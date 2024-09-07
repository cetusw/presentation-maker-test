const defaultPosition: Position = {x: 50, y: 50};
const defaultSize: Size = {width: 50, height: 50};
const defaultFontFamily: string = 'Arial';
const defaultFontSize: number = 16;
const defaultColor: string = '#FFFFFF';
const defaultText: string = 'New text';
const defaultTitle: string = 'New title';

enum Background {
    BackgroundColor = 'color',
    BackgroundImage = 'image',
    BackgroundGradient = 'gradient',
}

const testPresentation: Presentation = {
    id: '1',
    title: 'Test Presentation',
    author: 'Mikhail',
    createdAt: new Date('2024-09-05T00:00:00Z'),
    slides: [
        {
            id: 'slide-1',
            background: {
                type: Background.BackgroundColor,
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
                type: Background.BackgroundImage,
                imageUrl: defaultColor,
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

type Presentation = {
    id: string;
    title: string;
    author: string;
    createdAt: Date;
    slides: SlideCollection;
}

type SlideCollection = Slide[];

type Slide = {
    id: string;
    background: BackgroundType;
    objects: SlideObject[];
}

type BackgroundType = BackgroundColor | BackgroundImage | BackgroundGradient;

type BackgroundColor = {
    type: Background.BackgroundColor;
    color: string;
};

type BackgroundImage = {
    type: Background.BackgroundImage;
    imageUrl: string;
};

type BackgroundGradient = {
    type: Background.BackgroundGradient;
    firstColor: string;
    secondColor: string;
};

type SlideObject = TextObject | ImageObject;

type SlideItem = {
    position: Position;
    size: Size;
}

type TextObject = {
    id: string;
    type: 'text';
    content: string;
    fontFamily: string;
    fontSize: number;
} & SlideItem;

type ImageObject = {
    id: string;
    type: 'image';
    imageUrl: string;
} & SlideItem;

type Position = {
    x: number;
    y: number;
}

type Size = {
    width: number;
    height: number;
}

type ItemSelection = {
    selectedSlides: string[];
    selectedObjects: string[];
}

function updatePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle,
    };
}

function addNewSlide(presentation: Presentation): Presentation {
    const newSlide: Slide = {
        id: `slide-${Date.now()}`,
        background: {
            type: Background.BackgroundColor,
            color: defaultColor,
        },
        objects: [],
    };

    const updatedSlides: SlideCollection = [...presentation.slides, newSlide];

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function removeSlides(presentation: Presentation, items: ItemSelection): Presentation {
    const slidesToRemove = items.selectedSlides

    const updatedSlides: SlideCollection = presentation.slides.filter(
        slide => !slidesToRemove.some(toRemove => slide.id === toRemove)
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateSlideIndex(presentation: Presentation, items: ItemSelection, newIndex: number): Presentation {
    const updatedSlides: SlideCollection = [...presentation.slides];

    const slideIdToMove = items.selectedSlides[0];
    let currentIndex: number = findSlideIndex(updatedSlides, slideIdToMove);

    if (currentIndex === null) {
        return presentation;
    }

    const [removedSlide] = updatedSlides.splice(currentIndex, 1);
    updatedSlides.splice(newIndex, 0, removedSlide);

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function addTextToSlide(presentation: Presentation, items: ItemSelection) {
    const slideIdToEdit: string = items.selectedSlides[0];

    const textForSlide: TextObject = {
        id: `text-${Date.now()}`,
        type: 'text',
        content: defaultText,
        fontFamily: defaultFontFamily,
        fontSize: defaultFontSize,
        position: defaultPosition,
        size: defaultSize,
    }

    const slideToEdit: Slide = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }
    const updatedObjects: SlideObject[] = [...slideToEdit.objects, textForSlide];

    const updatedSlide: Slide = {
        ...slideToEdit,
        objects: updatedObjects,
    }

    const updatedSlides: Slide[] = presentation.slides.map(slide => slide.id === slideToEdit.id ? updatedSlide : slide);

    return {
        ...presentation,
        slides: updatedSlides,
    }
}

function addImageToSlide(presentation: Presentation, items: ItemSelection, url: string) {
    const slideIdToEdit: string = items.selectedSlides[0];

    const imageForSlide: ImageObject = {
        id: `image-${Date.now()}`,
        type: 'image',
        imageUrl: url,
        position: defaultPosition,
        size: defaultSize,
    }

    const slideToEdit: Slide = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }
    const updatedObjects: SlideObject[] = [...slideToEdit.objects, imageForSlide];

    const updatedSlide: Slide = {
        ...slideToEdit,
        objects: updatedObjects,
    }

    const updatedSlides: Slide[] = presentation.slides.map(slide => slide.id === slideToEdit.id ? updatedSlide : slide);

    return {
        ...presentation,
        slides: updatedSlides,
    }
}

function removeObjectFromSlide(presentation: Presentation, items: ItemSelection): Presentation {
    const slideIdToEdit: string = items.selectedSlides[0];
    const objectsIdsToRemove: string[] = items.selectedObjects;

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedObjects: SlideObject[] = slideToEdit.objects.filter(
        object => !objectsIdsToRemove.some(toRemove => object.id === toRemove)
    );

    const updatedSlide: Slide = {
        ...slideToEdit,
        objects: updatedObjects,
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateObjectPosition(presentation: Presentation, items: ItemSelection, newPosition: Position) {
    const slideIdToEdit: string = items.selectedSlides[0];
    const objectIdToEdit: string = items.selectedObjects[0];

    let slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedObjects: SlideObject[] = slideToEdit.objects.map((obj) => {
        if (obj.id !== objectIdToEdit) return obj;

        return {
            ...obj,
            position: newPosition,
        };
    });

    const updatedSlide: Slide = {
        ...slideToEdit,
        objects: updatedObjects,
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateObjectSize(presentation: Presentation, items: ItemSelection, newSize: Size) {
    const slideIdToEdit: string = items.selectedSlides[0];
    const objectIdToEdit: string = items.selectedObjects[0];

    let slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedObjects: SlideObject[] = slideToEdit.objects.map((obj) => {
        if (obj.id !== objectIdToEdit) return obj;

        return {
            ...obj,
            size: newSize,
        };
    });

    const updatedSlide: Slide = {
        ...slideToEdit,
        objects: updatedObjects,
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateTextContent(presentation: Presentation, items: ItemSelection, newText: string) {
    const slideIdToEdit: string = items.selectedSlides[0];
    const textIdToEdit: string = items.selectedObjects[0];

    let slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedObjects: SlideObject[] = slideToEdit.objects.map((obj) => {
        if (obj.id !== textIdToEdit) return obj;

        return {
            ...obj,
            content: newText,
        };
    });

    const updatedSlide: Slide = {
        ...slideToEdit,
        objects: updatedObjects,
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateTextFontSize(presentation: Presentation, items: ItemSelection, newFontSize: number) {
    const slideIdToEdit: string = items.selectedSlides[0];
    const textIdToEdit: string = items.selectedObjects[0];

    let slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedObjects: SlideObject[] = slideToEdit.objects.map((obj) => {
        if (obj.id !== textIdToEdit) return obj;

        return {
            ...obj,
            fontSize: newFontSize,
        };
    });

    const updatedSlide: Slide = {
        ...slideToEdit,
        objects: updatedObjects,
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateTextFontFamily(presentation: Presentation, items: ItemSelection, newFontFamily: string) {
    const slideIdToEdit: string = items.selectedSlides[0];
    const textIdToEdit: string = items.selectedObjects[0];

    let slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedObjects: SlideObject[] = slideToEdit.objects.map((obj) => {
        if (obj.id !== textIdToEdit) return obj;

        return {
            ...obj,
            fontFamily: newFontFamily,
        };
    });

    const updatedSlide: Slide = {
        ...slideToEdit,
        objects: updatedObjects,
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateBackgroundColor(presentation: Presentation, items: ItemSelection, newColor: string) {
    const slideIdToEdit: string = items.selectedSlides[0];

    let slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedSlide: Slide = {
        ...slideToEdit,
        background: {
            type: Background.BackgroundColor,
            color: newColor,
        }
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateBackgroundImage(presentation: Presentation, items: ItemSelection, newUrl: string) {
    const slideIdToEdit: string = items.selectedSlides[0];

    let slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedSlide: Slide = {
        ...slideToEdit,
        background: {
            type: Background.BackgroundImage,
            imageUrl: newUrl,
        }
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function updateBackgroundGradient(presentation: Presentation, items: ItemSelection, newFirstColor: string, newSecondColor: string) {
    const slideIdToEdit: string = items.selectedSlides[0];

    let slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedSlide: Slide = {
        ...slideToEdit,
        background: {
            type: Background.BackgroundGradient,
            firstColor: newFirstColor,
            secondColor: newSecondColor,
        }
    };

    const updatedSlides: SlideCollection = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}


function findSlideIndex(slides: SlideCollection, slideId: string) {
    let currentIndex: number | null = null;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].id === slideId) {
            return i;
        }
    }
}

function findSlideById(slides: SlideCollection, slideId: string) {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].id === slideId) {
            return slides[i];
        }
    }
}


//Отладка

// let updatedPresentation = updatePresentationTitle(testPresentation, 'new title')
// console.log(updatedPresentation)
//
// updatedPresentation = createNewSlide(testPresentation)
// console.log(updatedPresentation)

let newSelectedItems: ItemSelection = {
    selectedSlides: ['slide-1'],
    selectedObjects: ['image-1', 'text-1'],
}

console.log(testPresentation.slides[0]);

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

// let updatedPresentation = updateBackgroundGradient(testPresentation, newSelectedItems, '#123456', '#654321')
// console.log(updatedPresentation.slides[0])