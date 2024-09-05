type Presentation = {
    id: string;
    title: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    slides: Slide[];
}

type Slide = {
    title: string;
    texts?: slideText[];
    images?: Image[];
    index: string;
    backgroundColor: string;
    backgroundImage?: string;
    focused: boolean;
}

type SlideCollection = {
    numberOfSlides: number;
}

type itemSelection = {
    indexSelected: string;
}

type slideText = {
    index: string;
    content: string;
    fontSize: number;
    font: string;
    positionX: number;
    positionY: number
}

type Image = {
    index: string;
    url: string;
    width: number;
    height: number;
    positionX: number;
    positionY: number;
}