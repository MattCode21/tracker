
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects as defaultProjects, Project } from "@/data/projects";
import { FileText, Building2 } from "lucide-react";
import ExcelUploader from "@/components/ExcelUploader";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [hasUploadedFile, setHasUploadedFile] = useState(false);

  const handleDataLoaded = (newProjects: Project[]) => {
    setProjects(newProjects);
    setHasUploadedFile(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Project Management Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Business Development Projects Overview
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Excel Uploader - Show only if no file has been uploaded */}
        {!hasUploadedFile && (
          <div className="mb-12">
            <ExcelUploader onDataLoaded={handleDataLoaded} />
          </div>
        )}

        {/* Show projects grid */}
        {(hasUploadedFile || projects.length > 0) && (
          <>
            {hasUploadedFile && (
              <div className="mb-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setHasUploadedFile(false);
                    setProjects(defaultProjects);
                  }}
                >
                  Upload Different File
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 hover:border-blue-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <Building2 className="h-8 w-8 text-blue-600 mb-2" />
                      <Badge variant="secondary" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium">
                      {project.vendor}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FileText className="h-4 w-4 mr-2" />
                      {project.documents.length} documents
                    </div>
                    
                    <Link to={`/project/${project.id}`} state={{ project }}>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Check Status
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-gray-600">
            Manage your business development projects efficiently
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
