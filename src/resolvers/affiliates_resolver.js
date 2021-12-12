const affiliateResolver = {
    Query: {
        affiliatesByDocument: async(_, { document }, { dataSources, userIdToken }) => {
            if (userId == userIdToken)
                return await dataSources.accountAPI.affiliatesByDocument(document)
            else
                return null
        },
        allAfiliates: async(_,{ dataSources, userIdToken }) => {
            if (userId == userIdToken)
                return await dataSources.accountAPI.allAfiliates()
            else
                return null
        },
    },
    Mutation: {
        createAffiliate: async (_, { affiliateInput }, { dataSources }) => {
          const affiliateData = {
            name: affiliateInput.name,
            lastname: affiliateInput.lastname,
            document: affiliateInput.document,
            email: affiliateInput.email,
            phone: affiliateInput.phone,
            city: affiliateInput.city,
            address: affiliateInput.address,
          };
          return await dataSources.authAPI.createAffiliate(affiliateData);
        },
        updateAffiliate: (_, { affiliateInput }, {affiliateID},{ dataSources }) =>{
            const affiliateData = {
                name: affiliateInput.name,
                lastname: affiliateInput.lastname,
                document: affiliateInput.document,
                email: affiliateInput.email,
                phone: affiliateInput.phone,
                city: affiliateInput.city,
                address: affiliateInput.address,
            };
            return await dataSources.authAPI.updateAffiliate(affiliateData,affiliateID);
        },
        deleteAffiliate: (_, { affiliateID }, { dataSources }) =>{
            return await dataSources.authAPI.deleteAffiliate(affiliateID);
        }
    }
};
module.exports = affiliateResolver;

//Necesita revision