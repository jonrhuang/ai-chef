import Markdown from "react-markdown"

function cleanMarkdown(response) {
    if (!response) return ""

    response = response.replace(/```markdown/g, "")

    response = response.replace(/```/g, "")

    return response
}

export default function ChefRecipe(props) {
console.log(cleanMarkdown(props.recipe))
    return (
        <section>
            <Markdown>
                {cleanMarkdown(props.recipe)}
            </Markdown>
        </section>
    )
}