const testPresentation: Presentation = {
    id: '1',
    title: 'Test Presentation',
    author: 'Mikhail',
    createdAt: new Date('2024-09-05T00:00:00Z'),
    slides: [
        {
            background: {
                type: 'color',
                color: '#FFFFFF',
            },
            objects: [
                {
                    type: 'text',
                    content: 'Test Presentation',
                    fontName: 'Arial',
                    fontSize: 24,
                    position: { x: 100, y: 50 },
                    size: { width: 400, height: 50 },
                },
                {
                    type: 'image',
                    imageUrl: '',
                    position: { x: 50, y: 150 },
                    size: { width: 200, height: 150 },
                },
            ],
        },
        {
            background: {
                type: 'image',
                imageUrl: '',
            },
            objects: [
                {
                    type: 'text',
                    content: 'Test Presentation',
                    fontName: 'Arial',
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
    background: Background;
    objects: SlideObject[];
}

type Background = {
    type: 'color' | 'image' | 'gradient';
    color?: string;
    imageUrl?: string;
    gradientColors?: string[];
}

type SlideObject = TextObject | ImageObject;

type TextObject = {
    type: 'text';
    content: string;
    fontName: string;
    fontSize: number;
    position: Position;
    size: Size;
}

type ImageObject = {
    type: 'image';
    imageUrl: string;
    position: Position;
    size: Size;
}

type Position = {
    x: number;
    y: number;
}

type Size = {
    width: number;
    height: number;
}

type ItemSelection = {
    selectedSlides: Slide[];
    selectedObjects: SlideObject[];
}

function updatePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle,
    };
}

function createNewSlide(presentation: Presentation): Presentation {
    const newSlide: Slide = {
        background: {
            type: 'color',
            color: '#FFFFFF',
        },
        objects: [],
    };

    const updatedSlides: SlideCollection = [...presentation.slides, newSlide];

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function removeSlides(presentation: Presentation, slides: ItemSelection): Presentation {
    const slidesToRemove = slides.selectedSlides

    const updatedSlides: SlideCollection = presentation.slides.filter(
        slide => !slidesToRemove.some(toRemove => JSON.stringify(slide) === JSON.stringify(toRemove))
    );

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function changeSlideIndex(presentation: Presentation, slides: ItemSelection, newIndex: number): Presentation {
    const updatedSlides: SlideCollection = [...presentation.slides];

    const slideToMove = slides.selectedSlides[0];
    let currentIndex = findSlideIndex(updatedSlides, slideToMove);

    if (currentIndex === null) {
        return presentation;
    }

    updatedSlides.splice(currentIndex, 1);
    updatedSlides.splice(newIndex, 0, slideToMove);

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function findSlideIndex(slides: SlideCollection, slide: Slide) {
    let currentIndex: number | null = null;
    for (let i = 0; i < slides.length; i++) {
        if (JSON.stringify(slides[i]) === JSON.stringify(slide)) {
            currentIndex = i;
            break;
        }
    }

    return currentIndex;
}


//Отладка
console.log(testPresentation)

let updatedPresentation = updatePresentationTitle(testPresentation, 'new title')
console.log(updatedPresentation)

updatedPresentation = createNewSlide(testPresentation)
console.log(updatedPresentation)

let slide: Slide[] = [
    {
        background: {
            type: 'color',
            color: '#FFFFFF',
        },
        objects: [
            {
                type: 'text',
                content: 'Test Presentation',
                fontName: 'Arial',
                fontSize: 24,
                position: { x: 100, y: 50 },
                size: { width: 400, height: 50 },
            },
            {
                type: 'image',
                imageUrl: '',
                position: { x: 50, y: 150 },
                size: { width: 200, height: 150 },
            },
        ],
    }
]

let newSelectedSlides: ItemSelection = {
    selectedSlides: slide,
    selectedObjects: [],
}

// updatedPresentation = removeSlides(updatedPresentation, newSelectedSlides)
updatedPresentation = changeSlideIndex(updatedPresentation, newSelectedSlides, 2)
console.log(updatedPresentation)