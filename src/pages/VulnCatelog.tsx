import React from 'react';
import { useNavigate } from "react-router-dom";

const categories = [
  { name: 'Python', image: '/python.svg', route: '/python' },
  { name: 'Windows', image: '/windows.svg', route: '/windows' },
  { name: 'Metasploit', image: '/images/metasploit.png', route: '/metasploit' },
  { name: 'Golang', image: '/images/golang.png', route: '/golang' },
  { name: 'AWS', image: '/images/aws.png', route: '/aws' },
  { name: 'Kubernetes', image: '/images/kubernetes.png', route: '/kubernetes' },
  { name: 'RedHat', image: '/images/redhat.png', route: '/redhat' },
  { name: 'Oracle Linux', image: '/images/oracle-linux.png', route: '/oracle-linux' },
  { name: 'Azure', image: '/images/azure.png', route: '/azure' },
  { name: 'Ubuntu', image: '/images/ubuntu.png', route: '/ubuntu' },
];

export default function VulnCatalog() {
    const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 gap-4 p-5">
      {categories.map((category, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate(category.route)}
        >
          <img src={category.image} alt={category.name} className="w-16 h-16 mx-auto" />
          <p className="text-center mt-2 font-semibold">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
