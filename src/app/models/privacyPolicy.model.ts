export class PrivacyPolicy {
    title: string;
    subtitle: string;
    subtitleDate: string;
    content: PrivacyPolicyContent[];

    constructor(title: string, subtitle: string, subtitleDate: string, content: PrivacyPolicyContent[]) {
        this.title = title;
        this.subtitle = subtitle;
        this.subtitleDate = subtitleDate;
        this.content = content;
    }
}

export class PrivacyPolicyContent {
    title: string;
    description: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}