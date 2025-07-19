"use client"

import CodeCopy from "./CodeCompoennets"
import CustomImage from "./imagecompoenents"
export default function StaticExample() {
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

 <CustomImage
        src="https://img.freepik.com/free-photo/vestrahorn-mountains-stokksnes-iceland_335224-667.jpg?semt=ais_hybrid&w=740"
        alt="Test Image"
        fallbackSrc="https://via.placeholder.com/150"
        width="830px"
        height="450px"
        aspectRatio="3 / 2"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        borderRadius="lg"
        customBorderRadius="16px"
        shadow="md"
        customShadow="0px 4px 15px rgba(0,0,0,0.2)"
        border={true}
        borderWidth="2px"
        borderColor="#00000"
        borderStyle="thin"
        overlay={true}
        overlayColor="rgba(0,0,0,0.5)"
        overlayOpacity={0.4}
        overlayBlendMode="multiply"
        hoverOpacity={0.8}
        hoverShadow="0px 10px 20px rgba(0,0,0,0.3)"
        showLoader={true}
        loaderColor="#10b981"
        showErrorIcon={true}
        errorMessage="Could not load this image"
        brightness={1.1}
        contrast={1.2}
        saturate={1.5}
        blur={0.5}
        grayscale={0.2}
        sepia={0.3}
        hueRotate={30}
        transition="all 0.4s ease-in-out"
        className="rounded-lg"
        containerClassName="shadow-2xl"
        style={{ margin: "20px auto", maxWidth: "100%" }}
        onClick={() => alert("Image clicked")}
        onLoad={() => console.log("Image loaded")}
        onError={() => console.log("Image failed to load")}
        onMouseEnter={() => console.log("Mouse entered image")}
        onMouseLeave={() => console.log("Mouse left image")}
      />



      {/* JavaScript Example */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">JavaScript Function</h2>
        <CodeCopy
          code={`// Async function to fetch user data
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Usage example
fetchUserData(123).then(user => {
  if (user) {
    console.log('User found:', user.name);
  }
});`}
          language="javascript"
          showLineNumbers={true}
        />
      </div>

    </div>
  )
}
