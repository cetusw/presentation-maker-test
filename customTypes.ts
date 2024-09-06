const testPresentation: Presentation = {
    id: '1',
    title: 'Test Presentation',
    author: 'Mikhail',
    createdAt: new Date('2024-09-05T00:00:00Z'),
    slides: [
        {
            index: 0,
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
            index: 1,
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
    index: number;
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
        index: getLastSlideIndex(presentation) + 1,
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
    const indexesToRemove: number[] = slides.selectedSlides.map(slide => slide.index);

    const remainingSlides: SlideCollection = presentation.slides.filter(slide => indexesToRemove.indexOf(slide.index) === -1);

    const updatedSlides: SlideCollection = [];
    let newIndex: number = 0
    for (const slide of remainingSlides) {
        const updatedSlide: Slide = {
            ...slide,
            index: newIndex
        };
        updatedSlides.push(updatedSlide);
        newIndex++;
    }

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

// function changeSlideIndex(presentation: Presentation, slides: ItemSelection): Presentation {
//
// }

function getLastSlideIndex(presentation: Presentation): number {
    if (presentation.slides.length > 0) {
        return presentation.slides[presentation.slides.length - 1].index;
    } else {
        return 0;
    }
}

function findSlideByIndex(slideCollection: SlideCollection, index: number): Slide|undefined {
    for (let slide of slideCollection) {
        if (slide.index === index) {
            return slide;
        }
    }
    return undefined;
}

console.log(testPresentation)

let updatedPresentation = updatePresentationTitle(testPresentation, 'new title')
console.log(updatedPresentation)

updatedPresentation = createNewSlide(testPresentation)
console.log(updatedPresentation)

let slide: Slide[] = [
    {
        index: 0,
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
                position: {x: 80, y: 70},
                size: {width: 350, height: 60},
            },
        ],
    }
]

let newSelectedSlides: ItemSelection = {
    selectedSlides: slide,
    selectedObjects: [],
}

updatedPresentation = removeSlides(updatedPresentation, newSelectedSlides)
console.log(updatedPresentation)