export interface SkillGapAnalysis {
  targetRole: string;
  analysis: {
    matchedSkills: string[];
    missingSkills: string[];
    statistics: {
      totalRequired: number;
      matched: number;
      missing: number;
      matchPercentage: number;
      readinessLevel: string;
    };
    learningOrder: string[];
    recommendations: {
      text: string;
      source: string;
    };
  };
  timestamp: string;
}

export interface RoadmapPhase {
  title: string;
  duration: string;
  skills: string[];
  projects: string[];
  order: number;
  aiTip?: string;
}

export interface CareerRoadmap {
  targetRole: string;
  roadmap: {
    phase1: RoadmapPhase;
    phase2: RoadmapPhase;
    phase3: RoadmapPhase;
  };
  totalDuration: string;
  personalizedTips: boolean;
  timestamp: string;
}

export interface HackerNewsStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: string;
  type: string;
  descendants: number;
}

export interface HackerNewsResponse {
  count: number;
  stories: HackerNewsStory[];
  timestamp: string;
  source: string;
}

export interface AnalysisState {
  skillGap: SkillGapAnalysis | null;
  roadmap: CareerRoadmap | null;
  hackerNews: HackerNewsResponse | null;
  loading: boolean;
  error: string | null;
}
