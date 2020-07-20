import { Interface, BaseClass, Property, CodeGenerator } from "pont-engine";

export default class MyGenerator extends CodeGenerator {
	getBaseClassInDeclaration(base: BaseClass) {
		const originProps = base.properties;

		base.properties = base.properties.map((prop) => {
			return new Property({
				...prop,
				required: false,
			});
		});

		const result = super.getBaseClassInDeclaration(base);
		base.properties = originProps;
		console.log(result);
		return result.replace("class", "interface");
	}

	getInterfaceContent(inter: Interface) {
		function toHump(name: string) {
			let _name = name;
			if (_name[0] === "/") {
				_name = _name.substr(1);
			}
			return _name.replace(/\/(\w)/g, function (all: any, letter: any) {
				return letter.toUpperCase();
			});
		}

		function getParams(className = "Params", parameters: any) {
			return `interface ${className} {
      ${parameters
				.filter((param: any) => param.in === "path" || param.in === "query" || param.in === "formData")
				.map((param: any) => param.toPropertyCode("typeScript", true))
				.join("")}
    }
  `;
		}

		const method = inter.method.toUpperCase();
		inter.parameters;
		return `
    /**
     * @desc ${inter.description}
     */
    import { request } from "umi";
    export ${getParams(toHump(inter.path) + "Params", inter.parameters)}
    export async function ${toHump(inter.path)} <T>(params:${toHump(inter.path) + "Params"},options?:any): Promise<T> {
        // @ts-ignore
        return request("${inter.path}", {
            method: "${method}",
         ${method === "POST" ? "data: params," : "params: params,"}

            ${method === "POST" ? ' requestType: "form",' : ""}
            ...options
});
}`;
	}
}
