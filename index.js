import moviesService from "./movies/index.js";
import yargs from "yargs";
import { program } from "commander";

const invokeAction = async ({ action, id, title, director }) => {
	switch (action) {
		case "list":
			const allMovies = await moviesService.getAllMovies();
			return console.log(allMovies);

		case "getById":
			const oneMovie = await moviesService.getMovieById(id);
			return console.log(oneMovie);
		case "add":
			const newMovie = await moviesService.addMovie({ title, director });
			return console.log(newMovie);

		case "updateMovieById":
			const updateMovie = await moviesService.updateMovieById({
				id,
				title,
				director,
			});
			return console.log(updateMovie);

		case "deleteMovieByID":
			const deleteMovie = await moviesService.deleteMovieByID(id);
			return deleteMovie;
		default:
			console.log("Unknown action");
	}
};

// invokeAction({ action: "list" });
// invokeAction({ action: "getById", id: "3" });
// invokeAction({ action: "add", title: "avata water", director: "cameron" });
// invokeAction({
// 	action: "updateMovieById",
// 	id: "3",
// 	title: "avatar",
// 	director: "cameron",
// });
// invokeAction({ action: "deleteMovieByID", id: "2" });

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
// 	const action = process.argv[actionIndex + 1];
// 	invokeAction({ action });;
// }

// const { argv } = yargs(process.argv.splice(2));
// invokeAction(argv);

program
	.option("-a, --action <type>")
	.option("-i, --id <type>")
	.option("-t, --title <type>")
	.option("-d, --director <type>");

program.parse();

const options = program.opts();
invokeAction(options);
