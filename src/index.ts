#!/usr/bin/env node

import { Logger } from "@hammerhq/logger";
import tool from "@hammerhq/cli-tool";
import ngrok from "ngrok";

const logger = new Logger("NGROK");

tool.createCommand(
	{
		name: "auth",
		usage: "<auth_token>",
		example: ["AJKL_TH15.15.Y0UR.4UTH_T0K3N"],
		category: "Authorization",
		aliases: ["login", "token"],
		description: "Sets NGROK auth token",
		options: [
			{
				name: "token",
				type: String,
				defaultOption: true,
			},
		],
	},
	async (args) => {
		logger.event(`Authenticating NGROK with token ${args.token}`);

		ngrok
			.authtoken(args.token as string)
			.then(() => logger.success("NGROK authenticated!"))
			.catch((e) => {
				logger.error(
					`An error occured while authenticating with token ${args.token}`,
				);
				logger.warning(e);
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
			options: [
				{
					name: "addr",
					type: Number,
					defaultOption: true,
				},
				{
					name: "proto",
					type: String,
					defaultOption: false,
				},
				{
					name: "auth",
					type: String,
					defaultOption: false,
				},
				{
					name: "subdomain",
					type: String,
					defaultOption: false,
				},
				{
					name: "authtoken",
					type: String,
					defaultOption: false,
				},
				{
					name: "region",
					type: String,
					defaultOption: false,
				},
			],
		},
		async (args) => {
			logger.event("Starting NGROK tunnel");

			ngrok
				.connect(args)
				.then((url) => logger.success(`NGROK tunnel started on ${url}`))
				.catch((e) => {
					logger.error("An error occured while starting tunnel");
					logger.warning(e);
				});
		},
	)
	.help();
