import React from 'react'
import ReactQuill from "react-quill";

export default function Quill({body, handleChange, className}) {   
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean']
        ]
      }
return (<ReactQuill
          className={className}
          name="body"
          value={body}
          onChange={handleChange}
          placeholder="What are your thoughts?"
          modules={ modules }
        />
        )
}