// src/components/GradientFill.jsx
import React from "react";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

export default function GradientFill() {
	return (
		<div style={{ width: "100%", height: "100%", position: "relative" }}>
			<ShaderGradientCanvas
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					top: 0,
					left: 0,
					pointerEvents: "none",
				}}>
				<ShaderGradient
					animate="on"
					axesHelper="off"
					bgColor1="#000000"
					bgColor2="#000000"
					brightness={1.2}
					cAzimuthAngle={180}
					cDistance={3.6}
					cPolarAngle={90}
					cameraZoom={1}
					color1="#0129B0"
					color2="#db7fc2"
					color3="#C4D8FF"
					destination="onCanvas"
					embedMode="off"
					envPreset="city"
					format="gif"
					fov={45}
					frameRate={10}
					gizmoHelper="hide"
					grain="on"
					lightType="3d"
					pixelDensity={1}
					positionX={-1.4}
					positionY={0}
					positionZ={0}
					range="disabled"
					rangeEnd={40}
					rangeStart={0}
					reflection={0.1}
					rotationX={0}
					rotationY={10}
					rotationZ={50}
					shader="defaults"
					type="plane"
					uAmplitude={1}
					uDensity={1.3}
					uFrequency={5.5}
					uSpeed={0.8}
					uStrength={4}
					uTime={0}
					wireframe={false}
				/>
			</ShaderGradientCanvas>
		</div>
	);
}
