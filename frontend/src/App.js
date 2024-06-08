// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

function DisplayLocations() {

	const GET_EXAMPLES = gql`
	query GetExamples {

		getExamples {
			id
			title
			available
			owner {
				id
				name
			}
		}

	}
	`

	const { loading, error, data } = useQuery(GET_EXAMPLES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	if(data) {
		console.log(data); 
	}

	return data.getExamples.map(({ id, title, available, owner }) => (
		<div key={id}>
			<h3>{id}</h3>
			<h3>{title}</h3>
			<b>{available === true? 'Yes': 'No'}</b>
			<p>{owner.id}</p>
			<p>{owner.name}</p>
			<hr/>
		</div>
	));
}

function App() {


	return (
		<div className="App">
			<DisplayLocations/>
		</div>
	);
}

export default App;
