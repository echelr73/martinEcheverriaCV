import { ProfileStrengths } from './profile-strength.model';
import { Experience } from './experience.model';
import { Education } from './education.model';
import { Certification } from './certification.model';
import { Contact } from './contact.model';

export class CVData {
  name: string;
  role: string;
  description: string;
  profile_strengths: ProfileStrengths;
  experience: Experience[];
  education: Education;
  certifications: Certification[];
  contact: Contact;
  skills: string[];

  constructor(
    name: string,
    role: string,
    description: string,
    profile_strengths: ProfileStrengths,
    experience: Experience[],
    education: Education,
    certifications: Certification[],
    contact: Contact,
    skills: string[]
  ) {
    this.name = name;
    this.role = role;
    this.description = description;
    this.profile_strengths = profile_strengths;
    this.experience = experience;
    this.education = education;
    this.certifications = certifications;
    this.contact = contact;
    this.skills = skills;
  }
}
