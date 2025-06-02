
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { projects, Project } from "@/data/projects";
import { ArrowLeft, Home, CheckCircle, FileText, ExternalLink, MessageSquare, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  
  // Get project from location state (passed from Index) or fallback to static data
  const project = location.state?.project || projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment Added",
        description: "Your comment has been saved successfully.",
      });
      setNewComment("");
    }
  };

  // Helper function to check if field is empty or shows "No ... available"
  const isEmptyField = (value: string) => {
    return !value || value.trim() === '' || value.startsWith('No ') && value.endsWith(' available');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </div>
            <Badge variant="secondary" className="text-sm">
              {project.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
              <h2 className="text-xl text-gray-600 mt-1">{project.vendor}</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status and Next Steps */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="shadow-lg border-gray-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center text-green-800">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className={`text-lg font-semibold ${isEmptyField(project.status) ? 'text-gray-500 italic' : 'text-gray-900'}`}>
                  {project.status}
                </p>
              </CardContent>
            </Card>

            {/* Next Steps Card */}
            <Card className="shadow-lg border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center text-blue-800">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {project.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className={`${isEmptyField(step) ? 'text-gray-500 italic' : 'text-gray-700'}`}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Documents and Comments */}
          <div className="space-y-6">
            {/* Documents Card */}
            <Card className="shadow-lg border-gray-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                <CardTitle className="flex items-center text-purple-800">
                  <FileText className="h-5 w-5 mr-2" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 mb-4">
                  {project.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{doc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                  onClick={() => window.open(project.oneDriveLink, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  See Documents
                </Button>
              </CardContent>
            </Card>

            {/* Comments Card */}
            <Card className="shadow-lg border-gray-200">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                <CardTitle className="flex items-center text-orange-800">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className={`${isEmptyField(project.comments || '') ? 'text-gray-500 italic' : 'text-gray-700'}`}>
                      {project.comments || 'No comments available'}
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Add a comment:</label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Enter your comment here..."
                    className="min-h-[100px]"
                  />
                  <Button 
                    onClick={handleAddComment}
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                    disabled={!newComment.trim()}
                  >
                    Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
