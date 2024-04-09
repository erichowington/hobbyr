import api from "./apiConfig"

export const getUserProfiles = async () => {
    try {
        const response = await api.get( '/userprofiles/' );
        return response.data;
    } catch( error ) {
        throw error;
    }
};

export const getUserProfile = async ( id ) => {
    try {
        const response = await api.get( `/userprofiles/${id}/` );
        return response.data;

    } catch( error ) {
        throw error;
    }
};

export const createUserProfile = async ( userProfileData ) => {
    try {
        const response = await api.post( '/userprofiles/', userProfileData );
        return response.data;
    } catch( error ) {
        throw error;
    }
}

export const updateUserProfile = async ( id, userProfileData ) => {
    try {
        const response = await api.put( `/userprofiles/${id}/`, userProfileData );
        return response.data;
    } catch( error ) {
        throw error;
    }
}

export const deleteUserProfile = async ( id, userProfileData ) => {
    try {
        const response = await api.delete( `/userprofiles/${id}/`, userProfileData );
        return response.data;
    } catch( error ) {
        throw error;
    }
}

