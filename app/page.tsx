import styles from "./page.module.css";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const query = async (url: string) => {
  const res = await fetch(`${process.env.STRAPI_URL}/${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
  });
  return res.json();
}

const getProjects = async () => {
  return query("projects");
}

export default async function Home() {
  const { data } = await getProjects();
  return (
    <div className={styles.page}>
      <h1>Projects</h1>
      <ul>
        {
          data?.map((project: any, index: any) => (
            <div key={index} style={{ marginBottom: 20 }}>
              <h2>{project.title}</h2>
              <BlocksRenderer content={project.description} />
            </div>
          ))
        }
      </ul>
    </div>
  );
}
