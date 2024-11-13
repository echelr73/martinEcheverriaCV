export class TermsOfUse {
    title: string;
    subtitle: string;
    subtitleDate: string;
    content: TermsOfUseContent[];

    constructor(title: string, subtitle: string, subtitleDate: string, content: TermsOfUseContent[]) {
        this.title = title;
        this.subtitle = subtitle;
        this.subtitleDate = subtitleDate;
        this.content = content;
    }
}

export class TermsOfUseContent {
    title: string;
    description: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}