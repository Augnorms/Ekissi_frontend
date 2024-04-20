import React, { useState } from "react";
import { getInitials } from "../helperfunctions/functions";
import { useNavigate } from "react-router-dom";
import { Encrypt } from "../../components/helperfunctions/functions";

interface Node {
  id: number;
  label: string;
  children: Node[];
}

interface TreeNodeProps {
  node: Node;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  //preview each member
  const handleEachMember = (id:number)=>{
   navigate(`/profile/${Encrypt(String(id))}`);
  }

const initials = getInitials(
  node.label 
    ? node.label 
        .split(" ")
        .map((word) => word.charAt(0))
        .join(" ")
    : "", 
);


  return (
    <div>
      <div className="flex items-center gap-2 p-1 border border-blue-500">
        <div className="">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md"
            onClick={handleToggle}
          >
            {initials}
          </button>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleEachMember(node.id)}
          style={{ color: isExpanded ? "dodgerblue" : "" }}
        >
          {node.label}
        </div>
        <div>
          {isExpanded && node.children.length > 0 && (
            <div className="p-1">
              {node.children.map((child) => (
                <TreeNode key={child.id} node={child} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TreeProps {
  data: Node[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

type heirarchy = {
  id: number;
  label: string;
  children: [];
};
interface HierarchyProp {
  listheirarchy?: heirarchy[];
}


export const Hierarchy: React.FC<HierarchyProp> = ({ listheirarchy }) => {
  return <Tree data={listheirarchy||[]} />;
};





