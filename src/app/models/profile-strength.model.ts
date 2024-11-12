export class Profile {
    role: string;
    profile_strengths: ProfileStrengths;
}

export class ProfileStrength {
    title: string;
    tooltip: string;

    constructor(title: string, tooltip: string) {
        this.title = title;
        this.tooltip = tooltip;
    }
}

export class ProfileStrengths {
    title: string;
    strengths_learner: ProfileStrength;
    strengths_responsibility: ProfileStrength;
    strengths_focus: ProfileStrength;
    strengths_achiever: ProfileStrength;
    strengths_futuristic: ProfileStrength;

    constructor(
        title: string,
        learner: ProfileStrength,
        responsibility: ProfileStrength,
        focus: ProfileStrength,
        achiever: ProfileStrength,
        futuristic: ProfileStrength
    ) {
        this.title = title;
        this.strengths_learner = learner;
        this.strengths_responsibility = responsibility;
        this.strengths_focus = focus;
        this.strengths_achiever = achiever;
        this.strengths_futuristic = futuristic;
    }
}
