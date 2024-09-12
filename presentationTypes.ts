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

export type Background = {
     type: 'color' | 'image' | 'gradient';
}

export type BackgroundColor = {
    type: 'color';
    color: string;
};

export type BackgroundImage = {
    type: 'image';
    imageUrl: string;
};

export type BackgroundGradient = {
    type: 'gradient';
    firstColor: string;
    secondColor: string;
};

export type SlideObject = TextObject | ImageObject;

export type SlideItem = {
    position: Position;
    size: Size;
}

export type TextObject = SlideItem & {
    id: string;
    type: 'text';
    content: string;
    fontFamily: string;
    fontSize: number;
};

export type ImageObject = SlideItem & {
    id: string;
    type: 'image';
    imageUrl: string;
};

export type Position = {
    x: number;
    y: number;
}

export type Size = {
    width: number;
    height: number;
}

export type ItemSelection = {
    selectedSlidesIds: string[];
    selectedObjectsIds: string[];
}