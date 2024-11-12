export class Experience {
    position: string;
    company: string;
    period: string;
    description: string;
    technology: string[];
  
    constructor(
      position: string,
      company: string,
      period: string,
      description: string,
      technology: string[]
    ) {
      this.position = position;
      this.company = company;
      this.period = period;
      this.description = description;
      this.technology = technology;
    }
  }
  