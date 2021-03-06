import MaterialList from '@material-ui/core/List';
import MaterialItem from '@material-ui/core/ListItem';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import * as fragments from '../graphql/fragments';
import { useUsersListQuery, User } from '../graphql/types';

const ActualList = styled(MaterialList)`
    padding : 0;
`

const UserItem = styled(MaterialItem)`
    position : relative;
    padding : 7.5px 15px;
    display : flex;
    cursor : pinter;
`;

const ProfilePicture = styled.img`
    height : 50px;
    width : 50px;
    object-fit : cover;
    border-radius : 50%;
`

const Name = styled.div`
    padding-left : 15px;
    font-weight : bold;
`;

export const UsersListQuery = gql`
    query UsersList {
        users { 
            ...User
        }
    }
    ${fragments.user}
`;

interface ChildComponentProps {
    onUserPick : any;
}

const UsersList : React.FC<ChildComponentProps> =  ({onUserPick = (user : User) => {}, }) => {
    const { data, loading: loadingUsers } = useUsersListQuery();

    if(data === undefined) return null;
    const users = data.users;

    return (
        <ActualList>
            {
                !loadingUsers && users.map(user => (
                    <UserItem 
                    key={user.id} 
                    button
                    data-testid="user"
                    onClick={onUserPick.bind(null, user)} >
                        {
                            user !== null && user.picture !== null && (
                                <>
                                    <ProfilePicture data-testid="picture" src={user.picture} />
                                    <Name data-testid="name">{user.name}</Name>
                                </>
                            )
                        }
                    </UserItem>
                ))
            }
        </ActualList>

    );
};