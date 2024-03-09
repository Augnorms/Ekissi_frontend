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

  const handleEachMember = (id:number)=>{
   console.log(id);
   navigate(`/profile/${Encrypt(String(id))}`);
  }

  const initials = getInitials(
    node.label
      .split(" ")
      .map((word) => word.charAt(0))
      .join(" "),
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
          style={{ color: isExpanded ? "dodgerblue" : ""}}
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

// Usage
const heirarchyData: Node[] = [
  {
    id: 16,
    label: "Mama Aquincy",
    children: [
      {
        id: 1,
        label: "Dorothy Ada Payne",
        children: [
          {
            id: 4,
            label: "Florence Austin",
            children: [
              {
                id: 8,
                label: "Richard Torkonoo",
                children: [
                  {
                    id: 19,
                    label: "Emmy Torkornoo",
                    children: [],
                  },
                  {
                    id: 21,
                    label: "Daryl Tokornoo",
                    children: [],
                  },
                ],
              },
              {
                id: 9,
                label: "Roberta Torkonoo",
                children: [],
              },
              {
                id: 10,
                label: "Reginald Torkonoo",
                children: [
                  {
                    id: 22,
                    label: "Jeremy Torkonoo",
                    children: [],
                  },
                ],
              },
              {
                id: 17,
                label: "Roselyn Torkonoo",
                children: [],
              },
            ],
          },
          {
            id: 5,
            label: "Josephine Korkor Quiacoe",
            children: [
              {
                id: 11,
                label: "Nelly Djukey",
                children: [],
              },
              {
                id: 13,
                label: "Ruth Djukey",
                children: [],
              },
            ],
          },
          {
            id: 6,
            label: "James Sunny Quaicoe",
            children: [
              {
                id: 18,
                label: "Sannichie Quaicoe",
                children: [],
              },
            ],
          },
          {
            id: 7,
            label: "Ruth Aboah",
            children: [
              {
                id: 12,
                label: "Augustine Normanyo",
                children: [
                  {
                    id: 23,
                    label: "junior normanyo",
                    children: [],
                  },
                  {
                    id: 24,
                    label: "John",
                    children: [],
                  },
                ],
              },
              {
                id: 14,
                label: "Florence Normanyo",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Kofi Ada Payne",
        children: [
          {
            id: 24,
            label: "John",
            children: [],
          },
        ],
      },
      {
        id: 3,
        label: "Emma Ada Payne",
        children: [],
      },
    ],
  },
];

const Hierarchy: React.FC = () => {
  return <Tree data={heirarchyData} />;
};

export default Hierarchy;
