'use client';

import ButtonForm from '@/components/ButtonForm';
import { VariableValueType } from '@/components/CardLayouts';
import PreviewSection from '@/components/myCards/PreviewSection';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import {
  CardTemplatesType,
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import teamsApi from '@/module/teams/teamApi';
import {
  updateDesignForm,
  updateTeamDetails,
  updateTitle,
} from '@/module/teams/teamTemplateSlice';
import { Team } from '@/module/teams/teamTypes';
import { UserType } from '@/module/user/userType';
import { Edit } from 'iconsax-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import TeamsBuilderSidebar from './(components)/TeamsBuilderSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isPreview, setIsPreview] = useState(false);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [publishLoading, togglePublishLoading] = useState(false);
  const router = useRouter();
  const teamSlug = searchParams.get('slug');
  const user = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );
  const teamTemplateState = useAppSelector(
    (state: RootState) => state.teamTemplate
  );

  const cardTemplate = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[
        `getCardTemmplate-${teamTemplateState.otherValues.template}`
      ]?.data as CardTemplatesType
  );

  const team = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeam-${teamSlug}`]?.data as Team
  );

  useEffect(() => {
    const updateCardState = () => {
      if (!team) return;
      dispatch(
        updateTeamDetails({
          ...team,
        })
      );
      dispatch(updateDesignForm({ logo: team.logo }));
    };

    updateCardState();
  }, [team, teamSlug]);

  useEffect(() => {
    if (teamSlug) {
      dispatch(teamsApi.endpoints.getEachTeam.initiate(teamSlug?.toString()));
    }
  }, [dispatch, teamSlug]);

  useEffect(() => {
    dispatch(
      cardsApi.endpoints.getCardTemmplate.initiate(
        teamTemplateState.otherValues.template
      )
    );
  }, [dispatch, teamTemplateState.otherValues.template]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  const handlePublish = () => {
    togglePublishLoading(true);

    var submitresponse = undefined;

    submitresponse = dispatch(
      teamsApi.endpoints.createTeamTemplate.initiate({
        design: teamTemplateState.design,
        otherValues: teamTemplateState.otherValues,
      })
    );
    submitresponse
      ?.then((res) => {
        const errorMessage = (res as any).error;
        if (errorMessage) {
          // toast.error(`Error: Please enter all required value`);
          togglePublishLoading(false);
          throw errorMessage;
        }
        // toast.success('Successfully updated');
        if ((res as any).data) {
          router.push(`/dashboard/teams`);
        }

        togglePublishLoading(false);
      })
      .catch((err) => {
        // toast.error('Something went wrong');
        togglePublishLoading(false);
        throw err;
      });
  };

  const variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType = {
    company: team?.name,
    showLogo: teamTemplateState.design.showLogo ?? false,
    showSocialIcons: teamTemplateState.design.showLogo,
    logoUrl: team?.logo,
    address: team?.address,
    designation: team?.ceo,
    // backgroundImage: teamTemplateState.design.backgroundImage,
    backgroundColor: teamTemplateState.design.backgroundColor,
    logo: teamTemplateState.design.logo,
  };

  return (
    <div className="flex max-h-screen min-h-screen flex-col gap-4 overflow-hidden px-2 lg:px-4">
      <div className="mx-auto mt-4 flex h-auto w-full max-w-sm flex-col gap-3 lg:max-w-none lg:flex-row">
        <div className="group flex h-10 min-w-max flex-grow items-center gap-2 rounded-md bg-zinc-100 px-4 has-[:focus]:border-1 has-[:focus]:border-black">
          <label htmlFor="title" className="text-sm text-grayfont">
            Title:
          </label>
          <input
            id="title"
            type="text"
            className="h-full w-80 grow bg-transparent text-sm font-bold focus:border-0 focus:outline-0"
            value={teamTemplateState.otherValues.title ?? ''}
            onChange={(e) => handleTitleChange(e)}
          />
          <label htmlFor="title" className="text-grayfont">
            <Edit size="20" />
          </label>
        </div>
        <div className="flex items-center gap-2">
          <span className="grow">
            <ButtonForm
              label="Next"
              isLoading={publishLoading}
              className="min-w-[5rem] rounded-sm text-sm"
              // isLoading={publishLoading}
              handleClick={handlePublish}
            />
          </span>
        </div>
      </div>
      <div className="mb-5 flex grow items-start gap-4 max-lg:mb-20">
        <div
          className={`mx-auto w-full max-w-sm lg:block lg:max-w-md ${!isPreview ? 'block' : 'hidden'}`}
        >
          <div className="flex h-full flex-col gap-4 lg:flex-row">
            <div className="w-full @container lg:basis-24">
              <TeamsBuilderSidebar
                teamSlug={teamSlug}
                // cardAction={cardAction}
              />
            </div>
            <div className="h-[calc(100vh-17rem)] w-full grow overflow-hidden @container lg:h-[calc(100vh-6rem)]">
              {children}
            </div>
          </div>
        </div>
        <div
          className={`sticky top-4 h-[calc(100vh-12rem)] w-full grow overflow-hidden overflow-y-scroll rounded-xl border-zinc-200 lg:block lg:h-[calc(100vh-6rem)] lg:border ${isPreview ? 'block' : 'hidden'}`}
        >
          <div className="mx-auto my-5 max-w-sm bg-white px-2 lg:max-w-lg lg:px-4">
            <PreviewSection
              layout={parseInt(teamTemplateState.otherValues.template!)}
              user={user}
              variableValues={variableValues}
              // socialValues={cardState.cardInfos.values}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
