import { Raleway } from 'next/font/google'
const eduSaBeginner = Raleway({ subsets: ['latin'] })

export const Hero = () => {
	return (
		<div
			className="hero min-h-screen mb-12"
			style={{
				backgroundImage: `url("https://res.cloudinary.com/focusotter-tuts/image/upload/e_blur:214,f_auto,q_auto/v1678928041/lgbmuyncmwhbstp12cdn.jpg")`,
			}}
		>
			<div className="hero-overlay bg-opacity-60"></div>
			<div className="hero-content text-center text-neutral-content">
				<div className="max-w-md">
					<h1
						className={`text-5xl mb-5 font-bold text-cyan-300 ${eduSaBeginner.className}`}
					>
						The Travelling Dev
					</h1>
					<p className="mb-5 rounded-md p-1 text-2xl text-blue-200">
						A journey to see the world through the lens of a Developer
						Advocate🥑
					</p>
				</div>
			</div>
		</div>
	)
}
