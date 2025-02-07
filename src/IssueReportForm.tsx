import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface FormData {
    title: string;
    location: string;
    description: string;
    category: string;
    image?: FileList;
}

const categories = [
    { value: "animal_welfare", label: "🐾 Animal Welfare & Environmental NGOs" },
    { value: "health", label: "🏥 Health & Medical NGOs" },
    { value: "education", label: "📚 Education & Child Welfare NGOs" },
    { value: "human_rights", label: "⚖️ Human Rights & Social Justice NGOs" },
    { value: "disaster_relief", label: "🚨 Disaster Relief & Emergency Services NGOs" },
    { value: "poverty", label: "💰 Poverty Alleviation & Economic Development NGOs" },
    { value: "senior_support", label: "👴 Senior Citizen & Disability Support" },
];

const IssueReportForm: React.FC = () => {
    const { register, handleSubmit, control } = useForm<FormData>();
    const [preview, setPreview] = useState<string | null>(null);

    // Handle Form Submission
    const onSubmit = (data: FormData) => {
        console.log("Reported Issue Data:", data);
        if (data.image && data.image.length > 0) {
            console.log("Uploaded File:", data.image[0].name);
        }
    };

    // Handle Image Preview
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container">
            <h2>🚀 Report an Issue</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="input-group">
                    <input type="text" {...register("title", { required: true })} placeholder=" " />
                    <label>📌 Issue Title</label>
                </div>

                {/* Location */}
                <div className="input-group">
                    <input type="text" {...register("location", { required: true })} placeholder=" " />
                    <label>📍 Location</label>
                </div>

                {/* Category Dropdown */}
                <div className="input-group">
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <select {...field}>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </div>

                {/* Description */}
                <div className="input-group">
                    <textarea {...register("description", { required: true })} rows={4} placeholder=" "></textarea>
                    <label>📝 Description</label>
                </div>

                {/* File Upload */}
                <div className="file-upload" onClick={() => document.getElementById("image")?.click()}>
                    Click to Upload Image
                    <input 
                        type="file" 
                        id="image" 
                        accept="image/*" 
                        {...register("image")}
                        onChange={handleImageUpload} 
                    />
                </div>
                {preview && <img src={preview} className="file-preview" alt="Preview" />}

                {/* Submit Button */}
                <button type="submit">🚀 Submit Report</button>
            </form>
        </div>
    );
};

export default IssueReportForm;
