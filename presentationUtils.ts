import {defaultColor, defaultFontFamily, defaultFontSize, defaultPosition, defaultSize, defaultText} from "./constants";
import {Presentation, Slide, SlideObject, ItemSelection, ImageObject, TextObject, Position, Size, BackgroundType} from "./presentationTypes";
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
    const currentIndex: number = updatedSlides.findIndex(slide => slide.id === slideIdToMove);

    if (currentIndex === -1) {
        return presentation;
    }

    const [removedSlide] = updatedSlides.splice(currentIndex, 1);
    updatedSlides.splice(newIndex, 0, removedSlide);

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function addObjectToSlide(presentation: Presentation, slideIdToEdit: string, object: SlideObject) {
    const slideToEdit = presentation.slides.find(slide => slide.id === slideIdToEdit);
    if (!slideToEdit) {
        return presentation;
    }

    const updatedObjects: SlideObject[] = [...slideToEdit.objects, object];

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

    return addObjectToSlide(presentation, slideIdToEdit, textForSlide);
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

    return addObjectToSlide(presentation, slideIdToEdit, imageForSlide);
}

export function removeObjectFromSlide(presentation: Presentation, items: ItemSelection): Presentation {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectsIdsToRemove: string[] = items.selectedObjectsIds;

    const slideToEdit = presentation.slides.find(slide => slide.id === slideIdToEdit);
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

function updateSlideObject(presentation: Presentation, slideIdToEdit: string, newObject: SlideObject) {
    const slideToEdit = presentation.slides.find(slide => slide.id === slideIdToEdit);

    if (!slideToEdit) {
        return presentation;
    }

    const updatedObjects: SlideObject[] = slideToEdit.objects.map((obj) => {
        if (obj.id !== newObject.id) return obj;

        return newObject;
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

function findSelectedObject(presentation: Presentation, items: ItemSelection) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectIdToEdit: string = items.selectedObjectsIds[0];

    const slideToEdit = presentation.slides.find(slide => slide.id === slideIdToEdit);

    if (!slideToEdit) {
        return false;
    }

    const objectToEdit = slideToEdit.objects.find(object => object.id === objectIdToEdit);

    if (!objectToEdit || objectToEdit.type !== 'text') {
        return false;
    }

    return objectToEdit
}

export function updateObjectPosition(presentation: Presentation, items: ItemSelection, newPosition: Position) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectToEdit = findSelectedObject(presentation, items);

    if (!objectToEdit) {
        return presentation
    }

    return updateSlideObject(presentation, slideIdToEdit, {
        ...objectToEdit,
        position: newPosition,
    });
}

export function updateObjectSize(presentation: Presentation, items: ItemSelection, newSize: Size) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectToEdit = findSelectedObject(presentation, items);

    if (!objectToEdit) {
        return presentation
    }

    return updateSlideObject(presentation, slideIdToEdit, {
        ...objectToEdit,
        size: newSize,
    });
}

export function updateTextContent(presentation: Presentation, items: ItemSelection, newText: string) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectToEdit = findSelectedObject(presentation, items);

    if (!objectToEdit) {
        return presentation
    }

    return updateSlideObject(presentation, slideIdToEdit, {
        ...objectToEdit,
        content: newText,
    });
}

export function updateTextFontSize(presentation: Presentation, items: ItemSelection, newFontSize: number) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectToEdit = findSelectedObject(presentation, items);

    if (!objectToEdit) {
        return presentation
    }

    return updateSlideObject(presentation, slideIdToEdit, {
        ...objectToEdit,
        fontSize: newFontSize,
    });
}

export function updateTextFontFamily(presentation: Presentation, items: ItemSelection, newFontFamily: string) {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    const objectToEdit = findSelectedObject(presentation, items);

    if (!objectToEdit) {
        return presentation
    }

    return updateSlideObject(presentation, slideIdToEdit, {
        ...objectToEdit,
        fontFamily: newFontFamily,
    });
}

function updateSlideBackground(presentation: Presentation, slideIdToEdit: string, newBackground: BackgroundType): Presentation {
    const slideToEdit = presentation.slides.find(slide => slide.id === slideIdToEdit);

    if (!slideToEdit) {
        return presentation;
    }

    const updatedSlide: Slide = {
        ...slideToEdit,
        background: newBackground,
    };

    const updatedSlides: Slide[] = presentation.slides.map(slide =>
        slide.id === slideIdToEdit ? updatedSlide : slide
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

export function updateBackgroundColor(presentation: Presentation, items: ItemSelection, newColor: string): Presentation {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    return updateSlideBackground(presentation, slideIdToEdit, {
        type: 'color',
        color: newColor,
    });
}

export function updateBackgroundImage(presentation: Presentation, items: ItemSelection, newUrl: string): Presentation {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    return updateSlideBackground(presentation, slideIdToEdit, {
        type: 'image',
        imageUrl: newUrl,
    });
}

export function updateBackgroundGradient(presentation: Presentation, items: ItemSelection, newFirstColor: string, newSecondColor: string): Presentation {
    const slideIdToEdit: string = items.selectedSlidesIds[0];
    return updateSlideBackground(presentation, slideIdToEdit, {
        type: 'gradient',
        firstColor: newFirstColor,
        secondColor: newSecondColor,
    });
}