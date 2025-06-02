
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/data/projects';

interface ExcelUploaderProps {
  onDataLoaded: (projects: Project[]) => void;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onDataLoaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Find header row and extract data
        const headerRowIndex = jsonData.findIndex((row: any) => 
          row.some((cell: any) => cell && cell.toString().toLowerCase().includes('project'))
        );

        if (headerRowIndex === -1) {
          throw new Error('Could not find header row with "Project" column');
        }

        const headers = jsonData[headerRowIndex] as string[];
        const projectIndex = headers.findIndex(h => h && h.toLowerCase().includes('project'));
        const vendorIndex = headers.findIndex(h => h && h.toLowerCase().includes('vendor'));
        const statusIndex = headers.findIndex(h => h && h.toLowerCase().includes('status'));
        const nextStepsIndex = headers.findIndex(h => h && h.toLowerCase().includes('next'));
        const commentsIndex = headers.findIndex(h => h && h.toLowerCase().includes('comment'));
        const documentIndex = headers.findIndex(h => h && h.toLowerCase().includes('document'));

        const projects: Project[] = [];
        
        for (let i = headerRowIndex + 1; i < jsonData.length; i++) {
          const row = jsonData[i] as any[];
          if (!row[projectIndex]) continue; // Skip empty rows

          const projectName = row[projectIndex]?.toString() || '';
          const vendor = row[vendorIndex]?.toString() || '';
          const status = row[statusIndex]?.toString() || '';
          const nextStepsText = row[nextStepsIndex]?.toString() || '';
          const comments = row[commentsIndex]?.toString() || '';
          const documentLink = row[documentIndex]?.toString() || '';

          // Split next steps by line breaks or semicolons
          const nextSteps = nextStepsText
            .split(/[\n;,]/)
            .map(step => step.trim())
            .filter(step => step.length > 0);

          // Generate a simple ID from project name
          const id = projectName.toLowerCase().replace(/[^a-z0-9]/g, '');

          projects.push({
            id,
            name: projectName,
            vendor,
            status,
            nextSteps: nextSteps.length > 0 ? nextSteps : ['No next steps defined'],
            comments,
            oneDriveLink: documentLink || 'https://example-onedrive.com/' + id,
            documents: [
              'Project Proposal.pdf',
              'Requirements Document.docx',
              'Status Report.xlsx'
            ]
          });
        }

        onDataLoaded(projects);
        toast({
          title: 'Excel file loaded successfully',
          description: `Loaded ${projects.length} projects from the Excel file.`
        });

      } catch (error) {
        console.error('Error parsing Excel file:', error);
        toast({
          title: 'Error loading Excel file',
          description: 'Please make sure the file has the correct format with Project, Vendor, Status, Next Steps, Comments, and Document columns.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileSpreadsheet className="h-5 w-5 mr-2" />
          Upload Excel File
        </CardTitle>
        <CardDescription>
          Upload your proj.xlsx file to load project data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="excel-upload"
            disabled={isLoading}
          />
          <label htmlFor="excel-upload">
            <Button 
              variant="outline" 
              className="w-full cursor-pointer"
              disabled={isLoading}
              asChild
            >
              <div>
                <Upload className="h-4 w-4 mr-2" />
                {isLoading ? 'Loading...' : 'Choose Excel File'}
              </div>
            </Button>
          </label>
          <p className="text-xs text-gray-500 text-center">
            Supports .xlsx and .xls files
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelUploader;
