import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function useFetchData() {
  const data = useSWR("api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });
  return data;
}

function UpdatedAt() {
  const { data, isLoading } = useFetchData();
  if (!isLoading && data) {
    return (
      <p>
        Last updated at: {new Date(data.updated_at).toLocaleString("pt-BR")}
      </p>
    );
  }
  return <p>Loading...</p>;
}

function DatabaseStatus() {
  const { data, isLoading } = useFetchData();
  if (!isLoading && data) {
    return (
      <>
        <pre>
          <p>
            Database connections:{" "}
            {data.dependencies.database.oppened_connections}
          </p>
          <p>Database status: {data.dependencies.database.max_connections}</p>
          <p>Database version: {data.dependencies.database.version}</p>
        </pre>
      </>
    );
  }
}

export default function statusPage() {
  return (
    <>
      <h1>status page</h1>
      <DatabaseStatus />
      <UpdatedAt />
    </>
  );
}
