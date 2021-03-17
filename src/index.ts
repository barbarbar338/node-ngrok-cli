#!/usr/bin/env node

import daph from "daph";
import ngrok from "ngrok";
import * as pogger from "pogger";
import { removeProperties } from "remove-properties";

daph.createCommand(
	{
		name: "auth",
		usage: "<auth_token>",
		example: ["AJKL_TH15.15.Y0UR.4UTH_T0K3N"],
		category: "Authorization",
		aliases: ["login", "token"],
		description: "Sets NGROK auth token",
		argDefinitions: [
			{
				name: "token",
				type: String,
				default: true,
			},
		],
	},
	async (_command, args) => {
		pogger.event(`Authenticating NGROK with token ${args.token}`);
		ngrok
			.authtoken(args.token as string)
			.then(() => pogger.success("NGROK authenticated!"))
			.catch((e) => {
				pogger.error(
					`An error occured while authenticating with token ${args.token}`,
				);
				pogger.warning(e);
			});
	},
)
	.createCommand(
		{
			name: "serve",
			usage: "<port> [...options]",
			example: [
				"3000",
				"3000 --proto http",
				"5500 --auth username:password",
				"80 --subdomain example --proto http",
				"2333 --authtoken AJKL_TH15.15.Y0UR.4UTH_T0K3N",
				"3000 --region eu --subdomain example",
			],
			category: "Serve",
			aliases: ["run", "tunnel", "host", "start", "connect"],
			description: "Starts NGROK tunnel",
			argDefinitions: [
				{
					name: "addr",
					type: Number,
					default: true,
					isOptional: false,
				},
				{
					name: "proto",
					type: String,
					default: false,
					isOptional: true,
				},
				{
					name: "auth",
					type: String,
					default: false,
					isOptional: true,
				},
				{
					name: "subdomain",
					type: String,
					default: false,
					isOptional: true,
				},
				{
					name: "authtoken",
					type: String,
					default: false,
					isOptional: true,
				},
				{
					name: "region",
					type: String,
					default: false,
					isOptional: true,
				},
			],
		},
		async (_command, args) => {
			pogger.event("Starting NGROK tunnel");
			const options = removeProperties(args, ["_unknown"]);
			ngrok
				.connect(options)
				.then((url) => pogger.success(`NGROK tunnel started on ${url}`))
				.catch((e) => {
					pogger.error("An error occured while starting tunnel");
					pogger.warning(e);
				});
		},
	)
	.help();
