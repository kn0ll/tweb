// biome-ignore lint/style/useImportType: TODO
import * as React from "react";

import { TodosPageLink } from "./routes/TodosPage.js";

export default ({ children }: React.PropsWithChildren) => (
	<html lang="en">
		<body>
			<header>
				<h1>
					<TodosPageLink pathname="/" hash={null} search={null}>
						Logo
					</TodosPageLink>
				</h1>
			</header>
			{children}
		</body>
	</html>
);
