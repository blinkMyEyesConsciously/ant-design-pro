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
		return result.replace("class", "interface");
	}

	getInterfaceContent(inter: Interface) {
    /**
     * 生成请求名称
     * */
		function toHump(name: string) {
        // 去除头上的、
      let _name = name;
			if (_name[0] === "/") {
				_name = _name.substr(1);
			}
        // 去除路径参数 改为By
      var regex = /\{(.+?)\}/g;
      let strList=[]
      var result;
      while ((result = regex.exec(_name)) != null) {
        strList.push(result)
      }
      strList.forEach((item,index)=>{
        let s = item[1].replace(/\/(\w)/g,  (all, letter)=> letter.toUpperCase())
        _name=  _name.replace(item[0],index===0?"by/"+s:"andBy/"+s)
      })

      // 去除/  并且将斜线后面的字母改为大写

      return _name.replace(/\/(\w)/g, (all, letter)=> letter.toUpperCase());
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
    let paramsName=toHump('//'+toHump(inter.path))+'Params'
    let funName=toHump(inter.path)+method

    inter.parameters;
		return `
    /**
     * @desc ${inter.description}
     */
    import { request } from "umi";
    export ${getParams(paramsName, inter.parameters)}
    export async function ${funName} <T>(params:${paramsName},options?:any): Promise<T> {
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

