import {defaultColor} from './constants';

export type Presentation = {
    id: string;
    title: string;
    author: string;
    createdAt: Date;
    slides: SlideCollection;
}

export type SlideCollection = Slide[];

export type Slide = {
    id: string;
    background: BackgroundType;
    objects: SlideObject[];
}

export type BackgroundType = BackgroundColor | BackgroundImage | BackgroundGradient;

export enum Background {
    BackgroundColor = 'color',
    BackgroundImage = 'image',
    BackgroundGradient = 'gradient',
}

export type BackgroundColor = {
    type: Background.BackgroundColor;
    color: string;
};

export type BackgroundImage = {
    type: Background.BackgroundImage;
    imageUrl: string;
};

export type BackgroundGradient = {
    type: Background.BackgroundGradient;
    firstColor: string;
    secondColor: string;
};

export type SlideObject = TextObject | ImageObject;

export type SlideItem = {
    position: Position;
    size: Size;
}

export type TextObject = {
    id: string;
    type: 'text';
    content: string;
    fontFamily: string;
    fontSize: number;
} & SlideItem;

export type ImageObject = {
    id: string;
    type: 'image';
    imageUrl: string;
} & SlideItem;

export type Position = {
    x: number;
    y: number;
}

export type Size = {
    width: number;
    height: number;
}

export type ItemSelection = {
    selectedSlides: string[];
    selectedObjects: string[];
}