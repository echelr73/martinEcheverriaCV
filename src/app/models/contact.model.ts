export class ContactLink {
    text: string;
    url: string;
  
    constructor(text: string, url: string) {
      this.text = text;
      this.url = url;
    }
  }
  
  export class Contact {
    description: string;
    links: ContactLink[];
  
    constructor(description: string, links: ContactLink[]) {
      this.description = description;
      this.links = links;
    }
  }
  