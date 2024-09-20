import {defaultColor, defaultFontFamily, defaultFontSize, defaultPosition, defaultSize, defaultText} from "./constants";
import {Presentation, Slide, SlideObject, ItemSelection, ImageObject, TextObject, Position, Size} from "./presentationTypes";
import { v4 as generateUuid } from 'uuid';

export function updatePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle,
    };
}

export function addNewSlide(presentation: Presentation): Presentation {
    const newSlide: Slide = {
        id: `slide-${generateUuid()}`,
        background: {
            type: 'color',
            color: defaultColor,
        },
        objects: [],
    };

    const updatedSlides: Slide[] = [...presentation.slides, newSlide];

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function removeSlides(presentation: Presentation, items: ItemSelection): Presentation {
    const slidesToRemove = items.selectedSlidesIds

    const updatedSlides: Slide[] = presentation.slides.filter(
        slide => !slidesToRemove.some(toRemove => slide.id === toRemove)
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateSlideIndex(presentation: Presentation, items: ItemSelection, newIndex: number): Presentation {
    const updatedSlides: Slide[] = [...presentation.slides];

    const slideIdToMove = items.selectedSlidesIds[0];
    const currentIndex: number = findSlideIndex(updatedSlides, slideIdToMove);

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

export function addTextToSlide(presentation: Presentation, items: ItemSelection) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];

    const textForSlide: TextObject = {
        id: `text-${generateUuid()}`,
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

export function addImageToSlide(presentation: Presentation, items: ItemSelection, url: string) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];

    const imageForSlide: ImageObject = {
        id: `image-${generateUuid()}`,
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

export function removeObjectFromSlide(presentation: Presentation, items: ItemSelection): Presentation {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectsIdsToRemove: string[] = items.selectedObjectsIds;

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

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateObjectPosition(presentation: Presentation, items: ItemSelection, newPosition: Position) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectIdToEdit: string = items.selectedObjectsIds[0];

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
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

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateObjectSize(presentation: Presentation, items: ItemSelection, newSize: Size) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectIdToEdit: string = items.selectedObjectsIds[0];

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
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

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateTextContent(presentation: Presentation, items: ItemSelection, newText: string) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const textIdToEdit: string = items.selectedObjectsIds[0];

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
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

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateTextFontSize(presentation: Presentation, items: ItemSelection, newFontSize: number) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const textIdToEdit: string = items.selectedObjectsIds[0];

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
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

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateTextFontFamily(presentation: Presentation, items: ItemSelection, newFontFamily: string) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const textIdToEdit: string = items.selectedObjectsIds[0];

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
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

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateBackgroundColor(presentation: Presentation, items: ItemSelection, newColor: string) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedSlide: Slide = {
        ...slideToEdit,
        background: {
            type: 'color',
            color: newColor,
        }
    };

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateBackgroundImage(presentation: Presentation, items: ItemSelection, newUrl: string) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedSlide: Slide = {
        ...slideToEdit,
        background: {
            type: 'image',
            imageUrl: newUrl,
        }
    };

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateBackgroundGradient(presentation: Presentation, items: ItemSelection, newFirstColor: string, newSecondColor: string) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];

    const slideToEdit = findSlideById(presentation.slides, slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedSlide: Slide = {
        ...slideToEdit,
        background: {
            type: 'gradient',
            firstColor: newFirstColor,
            secondColor: newSecondColor,
        }
    };

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}


function findSlideIndex(slides: Slide[], slideId: string): number {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].id === slideId) {
            return i;
        }
    }
    return -1
}

function findSlideById(slides: Slide[], slideId: string) {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].id === slideId) {
            return slides[i];
        }
    }
    return {} as Slide
}