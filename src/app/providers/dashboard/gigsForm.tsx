'use client'
import { useCategories } from "@/context/categoryContext";
import { FormEvent, useState, useRef } from "react";
import DynamicIcon from "@/components/utill/DynamicIcons";
export default function GigForm(){

    const fileRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<string[]>([]);
    const [fullDescription, setFullDescription] = useState("");
    const {categories,loading} = useCategories();
    const serviceLocation = ["Akkaraipattu","Akuressa","Aluthgama","Ambalangoda","Ampara", "Anuradhapura","Athurugiriya",
        "Avissawella","Badulla", "Balangoda","Bandarawela","Batticaloa","Bentota","Beruwala","Boralesgamuwa","Chavakachcheri",
        "Chilaw","Colombo","Dambulla","Dehiwala","Deniyaya","Ella","Embilipitiya","Eravur","Galle","Gampaha","Gampola","Hambantota",
        "Haputale","Hatton","Hikkaduwa","Homagama","Horana","Ja-Ela","Jaffna","Kadawatha","Kalmunai","Kalutara","Katunayake",
        "Kattankudy","Kaduwela","Kandy","Kelaniya","Kegalle","Kesbewa","Kilinochchi","Kuliyapitiya","Kurunegala","Maharagama","Mannar",
        "Matale","Matara","Mawanella","Medawachchiya","Minuwangoda","Monaragala","Moratuwa","Mount Lavinia","Mullaitivu",
        "Nawalapitiya","Negombo","Nikaweratiya","Nuwara Eliya","Panadura","Pelmadulla","Piliyandala","Point Pedro","Polonnaruwa",
        "Puttalam","Ragama","Rakwana","Ratnapura","Seeduwa","Sigiriya","Sri Jayawardenepura Kotte","Talawakele","Tangalle",
        "Tissamaharama","Trincomalee","Valvettithurai","Vavuniya","Warakapola","Wattala","Weligama","Wellawaya"];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
        files.forEach((file) => {
        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, url]);
        });
    };

    const removeImage = (i: number) => {
        setImages((prev) => prev.filter((_, idx) => idx !== i));
    };

    function onFormSubmit(value: FormEvent<HTMLFormElement>){
        const formData = new FormData(value.currentTarget);
    }

    return(
        <div>
            <form onSubmit={onFormSubmit} className="bg-white rounded-xl shadow-2xl">
                <header className="bg-gray-100 rounded-t-xl p-5 grid gap-1">
                    <h1 className="text-md md:text-lg lg:text-xl">Create new Gig</h1>
                    <h1 className=" text-sm md:text-md lg:text-lg text-gray-600">Fill in the details to publish your service listing</h1>
                </header>
                 {/* input container */}
                <div className="p-5 grid gap-8">
                    <div className="grid gap-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="p-2 bg-gray-100 w-full rounded-md" 
                            placeholder="eg. Profressional deep cleaning service"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="fullDescription">Description</label>
                        <textarea name="fullDescription"
                            placeholder="Describe your service in detail. Include what's covered, tools used, and any special notes for clients..."
                            rows={5}
                            cols={10}
                            className="p-2 bg-gray-100 w-full rounded-md resize-none"
                            onChange={(e)=> setFullDescription(e.target.value)}
                        />
                        <p className="text-[#9CA3AF] text-[11px]">{fullDescription.length}/500 characters</p>
                    </div>
                    
                    {/* category + price row */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="grid gap-2 ">
                            <label htmlFor="">Categories</label>
                            <select name="categories"
                                    className="border-gray-100 border w-full rounded-md bg-gray-100 p-2"
                                    defaultValue={"categories"}
                                    >
                                    <option value="">Categories</option>
                                    {
                                        categories.map(category => 
                                            loading ? <option value="">loading</option> : 
                                                <option key={category.id} value={category.name}>{category.name}</option>
                                        )
                                    }
                            </select>
                        </div>
                        <div className="grid gap-2 flex-1">
                            <label htmlFor="price">Price</label>
                            <div className="flex gap-2">
                                <input type="text" className="p-2 bg-gray-100 w-full rounded-md" 
                                    placeholder="eg. Profressional deep cleaning service"
                                />
                                
                                <select name="priceType" className="p-2 bg-gray-100 rounded-md 
                                    focus-within:bg-gray-100 focus-within:p-2">
                                    <option value="hr">Hr</option>
                                    <option value="square meters">m²</option>
                                    <option value="per job">Per job</option>
                                </select>
                            </div>   
                        </div>
                    </div>

                    <div className="grid gap-2 ">
                        <label htmlFor="location">location</label>
                        <select name="location"
                            className="border-gray-100 border w-full rounded-md bg-gray-100 p-2
                                 focus-within:bg-gray-100 focus-within:p-2"
                            defaultValue={"location"}
                            >
                            <option value="" className="text-gray-600">select location</option>
                            {
                                serviceLocation.map((location,i) => 
                                    <option key={i} value={location}>{location}</option>
                                )
                            }
                        </select>
                    </div>
                     <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-[#374151]" style={{ fontSize: '13px', fontWeight: 600 }}>
                        
                        Upload Images
                        <span className="text-[#9CA3AF]" style={{ fontSize: '11px', fontWeight: 400 }}>(Optional, up to 5)</span>
                        </label>

                        {/* Uploaded Images Grid */}
                        {images.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-3">
                            {images.map((img, i) => (
                            <div key={i} className="relative w-20 h-20 rounded-xl  border border-[#EAECF0]">
                                <img src={img} alt="" className="w-full h-full object-cover rounded-md" />
                                <button
                                type="button"
                                onClick={() => removeImage(i)}
                                className="absolute -top-1 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white
                                 flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm z-50"
                                >
                                 <DynamicIcon name="IoIosCloseCircle"/>
                                </button>
                            </div>
                            ))}
                        </div>
                        )}

                        {images.length < 5 && (
                        <div
                            onClick={() => fileRef.current?.click()}
                            className="border-2 border-dashed border-[#DBEAFE] rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#3B6FE8] hover:bg-[#F0F5FF] transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] flex items-center justify-center">
                             <DynamicIcon name="FaUpload"/>
                            </div>
                            <div className="text-center">
                            <p className="text-[#374151]" style={{ fontSize: '14px', fontWeight: 600 }}>
                                Click to upload or drag & drop
                            </p>
                            <p className="text-[#9CA3AF] mt-0.5" style={{ fontSize: '12px' }}>PNG, JPG up to 10MB each</p>
                            </div>
                        </div>
                        )}
                        <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                        />
                    </div>
                    
                </div>
            </form>
        </div>
    );
}