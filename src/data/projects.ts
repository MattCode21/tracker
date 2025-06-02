
export interface Project {
  id: string;
  name: string;
  vendor: string;
  status: string;
  nextSteps: string[];
  comments?: string;
  oneDriveLink: string;
  documents: string[];
}

export const projects: Project[] = [
  {
    id: "iconlavish",
    name: "New Projects",
    vendor: "IconLavish",
    status: "Various",
    nextSteps: [
      "Review project requirements",
      "Finalize vendor selection",
      "Set project timelines"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/iconlavish",
    documents: [
      "Project Proposal.pdf",
      "Requirements Document.docx",
      "Budget Analysis.xlsx"
    ]
  },
  {
    id: "vos",
    name: "Natural",
    vendor: "VOS",
    status: "Angled",
    nextSteps: [
      "Complete design review",
      "Approve material specifications",
      "Schedule installation"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/vos",
    documents: [
      "Design Specifications.pdf",
      "Material List.xlsx",
      "Installation Guide.pdf"
    ]
  },
  {
    id: "hglmascot",
    name: "External",
    vendor: "HGL Mascot",
    status: "Sanchoir",
    nextSteps: [
      "External vendor evaluation",
      "Contract negotiations",
      "Timeline confirmation"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/hglmascot",
    documents: [
      "Vendor Evaluation.pdf",
      "Contract Draft.docx",
      "Timeline.xlsx"
    ]
  },
  {
    id: "pfrashantipy",
    name: "Hardware",
    vendor: "PFrashanti Py",
    status: "Landscapin",
    nextSteps: [
      "Hardware specifications review",
      "Landscaping design approval",
      "Implementation planning"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/pfrashantipy",
    documents: [
      "Hardware Specs.pdf",
      "Landscape Design.pdf",
      "Implementation Plan.docx"
    ]
  },
  {
    id: "hargana",
    name: "Sav Horse Garden",
    vendor: "Hargana Global",
    status: "Hooks",
    nextSteps: [
      "Garden design finalization",
      "Hook installation planning",
      "Safety assessment"
    ],
    comments: "Column ECC - priority for security, durability, zero complexity, Cost management related tasks on track, Zero complaints, All compliments. All positive quality track flow.",
    oneDriveLink: "https://example-onedrive.com/hargana",
    documents: [
      "Garden Design.pdf",
      "Safety Assessment.docx",
      "Installation Manual.pdf"
    ]
  },
  {
    id: "ambica7",
    name: "Landscapin",
    vendor: "Ambica 7",
    status: "Agri Products",
    nextSteps: [
      "Agricultural product sourcing",
      "Landscaping implementation",
      "Quality control setup"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/ambica7",
    documents: [
      "Product Catalog.pdf",
      "Quality Standards.docx",
      "Implementation Timeline.xlsx"
    ]
  },
  {
    id: "greenpro",
    name: "Agri Products",
    vendor: "Green pro",
    status: "Roller Aerator",
    nextSteps: [
      "Roller aerator testing",
      "Equipment maintenance schedule",
      "Training for operators"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/greenpro",
    documents: [
      "Equipment Manual.pdf",
      "Maintenance Schedule.xlsx",
      "Training Materials.docx"
    ]
  },
  {
    id: "ramco",
    name: "Roller Aerator",
    vendor: "Ramco",
    status: "Striking Seahorse",
    nextSteps: [
      "Seahorse design approval",
      "Striking mechanism testing",
      "Final quality inspection"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/ramco",
    documents: [
      "Design Approval.pdf",
      "Testing Report.docx",
      "Quality Checklist.xlsx"
    ]
  },
  {
    id: "gardes",
    name: "Striking Seahorse",
    vendor: "Gardes",
    status: "Builders Network",
    nextSteps: [
      "Network setup completion",
      "Builder coordination",
      "Project timeline alignment"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/gardes",
    documents: [
      "Network Setup.pdf",
      "Builder Contracts.docx",
      "Project Schedule.xlsx"
    ]
  },
  {
    id: "hgl",
    name: "Builders Network",
    vendor: "HGL",
    status: "In Progress",
    nextSteps: [
      "Complete phase 1 deliverables",
      "Review milestone achievements",
      "Plan phase 2 activities"
    ],
    comments: "",
    oneDriveLink: "https://example-onedrive.com/hgl",
    documents: [
      "Phase 1 Report.pdf",
      "Milestone Review.docx",
      "Phase 2 Plan.xlsx"
    ]
  }
];
