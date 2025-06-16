import {
  Award,
  Briefcase,
  CheckCircle,
  Heart,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { GiLaserWarning } from "react-icons/gi";
import { MdScience } from "react-icons/md";

const CATEGORIES = [
  { value: "nursing", label: "Nursing", icon: Heart },
  { value: "medical Officer", label: "Medical Officer", icon: Award },
  { value: "pharmacy", label: "Pharmacy", icon: CheckCircle },
  { value: "laboratory", label: "Laboratory", icon: MdScience },
  { value: "radiology", label: "Radiology", icon: GiLaserWarning },
  { value: "medical engineer", label: "Medical Engineer", icon: Settings },
  { value: "dental", label: "Dental", icon: Shield },
  { value: "administration", label: "Administration", icon: Briefcase },
  { value: "orthopedics", label: "Orthopedics", icon: Users },
];

const JOB_TYPES = [
  { value: "locum", label: "Locum" },
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "temporary", label: "Temporary" },
  { value: "internship", label: "Internship" },
];

const EXPERIENCE_LEVELS = [
  { value: "entry-level", label: "Entry Level" },
  { value: "1+", label: "1+ Years" },
  { value: "2+", label: "2+ Years" },
  { value: "3+", label: "3+ Years" },
  { value: "4+", label: "4+ Years" },
  { value: "5+", label: "5+ Years" },
];

const LOCATIONS = [
  { value: "nairobi", label: "Nairobi" },
  { value: "mombasa", label: "Mombasa" },
  { value: "kisumu", label: "Kisumu" },
  { value: "nakuru", label: "Nakuru" },
  { value: "eldoret", label: "Eldoret" },
];

export { CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS, LOCATIONS };
