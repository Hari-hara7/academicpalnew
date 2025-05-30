export interface Resource {
  userEmail: string;
  resourceName: string;
  resourceType: "file" | "link";
  resourceUrl: string;
  shareableLink?: string; // Added this line
  year: string;
  semester: string;
  branch: string;
  subject: string;
}
