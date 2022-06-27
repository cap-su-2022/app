import { GetServerSideProps } from 'next';
import AdminLayout from '../components/layout/admin.layout';

import { Button, createStyles } from '@mantine/core';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useRouter } from 'next/router';
import { BLACK, GRAY, WHITE } from '@app/constants';
import { Message, User } from 'tabler-icons-react';

function NotificationManagement(props: any) {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const isSpinnerLoading = useAppSelector((state) => state.spinner.isEnabled);

  return (
    <AdminLayout>
      <div className={classes.bodyForm}>
        <div>
          <div className={classes.bodyLayout}>
            <div className={classes.bodyLayout}>
              <div className={classes.bodyPosition}>
                <div className={classes.bodySize}>
                  <div className={classes.bodyContainerForm}>
                    <div className={classes.bodyContainerLayout}>
                      <div className={classes.bodyContainerSize}>
                        <div className={classes.bodyColumn}>
                          <div className={classes.bodyColumnBack}></div>
                          <div className={classes.notificationForm}>
                            <div className={classes.notificationSpacingHeader}>
                              <div className={classes.notificationLayout}>
                                <div className={classes.notificationLayoutForm}>
                                  <div
                                    className={classes.notificationLayoutSize}
                                  >
                                    <div
                                      className={
                                        classes.notificationLayoutPosition
                                      }
                                    >
                                      <div
                                        aria-label="Notification"
                                        className={
                                          classes.notificationContainer
                                        }
                                      >
                                        <div
                                          className={
                                            classes.notificationContainerBack
                                          }
                                        ></div>
                                        <div
                                          aria-label="Notification Header"
                                          className={
                                            classes.notificationHeaderForm
                                          }
                                        >
                                          <div
                                            className={
                                              classes.notificationHeaderLayout
                                            }
                                          >
                                            <div
                                              className={
                                                classes.notificationHeaderBoxSize
                                              }
                                            >
                                              <div
                                                className={
                                                  classes.notificationHeaderContentForm
                                                }
                                              >
                                                <div
                                                  className={
                                                    classes.notificationHeaderContentLayout
                                                  }
                                                >
                                                  <div
                                                    className={
                                                      classes.notificationHeaderContentSize
                                                    }
                                                  >
                                                    <span
                                                      className={
                                                        classes.notificationHeaderContentAttribute
                                                      }
                                                    >
                                                      <h1
                                                        className={
                                                          classes.notificationHeaderContentName
                                                        }
                                                      >
                                                        Notification
                                                      </h1>
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                className={
                                                  classes.notificationHeaderButtonForm
                                                }
                                              >
                                                <div
                                                  className={
                                                    classes.notificationHeaderButtonLayout
                                                  }
                                                >
                                                  <div
                                                    className={
                                                      classes.notificationHeaderButtonSize
                                                    }
                                                  >
                                                    <Button
                                                      variant="default"
                                                      className={
                                                        classes.notificationHeaderButtonAttribute
                                                      }
                                                    >
                                                      <i
                                                        className={
                                                          classes.notificationHeaderIconAttribute
                                                        }
                                                      ></i>
                                                      <div
                                                        className={
                                                          classes.notificationHeaderIconBack
                                                        }
                                                      ></div>
                                                    </Button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <div
                                            aria-label="Notification Filter"
                                            className={
                                              classes.notificationFilterForm
                                            }
                                          >
                                            <div
                                              className={
                                                classes.notificationFilterButtonForm
                                              }
                                            >
                                              <Button
                                                variant="light"
                                                className={
                                                  classes.notificationFilterButtonLayout
                                                }
                                              >
                                                <span
                                                  className={
                                                    classes.notificationFilterButtonAttribute
                                                  }
                                                >
                                                  <span
                                                    className={
                                                      classes.notificationFilterButtonName
                                                    }
                                                  >
                                                    All
                                                  </span>
                                                </span>
                                                <div
                                                  className={
                                                    classes.notificationFilterButtonAttributeBack
                                                  }
                                                ></div>
                                              </Button>
                                            </div>
                                            <div
                                              className={
                                                classes.notificationFilterButtonForm
                                              }
                                            >
                                              <Button
                                                variant="default"
                                                className={
                                                  classes.notificationFilterButtonLayout
                                                }
                                              >
                                                <span
                                                  className={
                                                    classes.notificationFilterButtonAttribute
                                                  }
                                                >
                                                  <span
                                                    className={
                                                      classes.notificationFilterButtonName
                                                    }
                                                  >
                                                    Not Read
                                                  </span>
                                                </span>
                                                <div
                                                  className={
                                                    classes.notificationFilterButtonAttributeBack
                                                  }
                                                ></div>
                                              </Button>
                                            </div>
                                          </div>
                                          <div>
                                            <div
                                              aria-label="Notification List"
                                              className={
                                                classes.notificationListForm
                                              }
                                            >
                                              <div style={{ outline: 'none' }}>
                                                <div>
                                                  <div
                                                    className={
                                                      classes.notificationListLayout
                                                    }
                                                  >
                                                    <div
                                                      className={
                                                        classes.notificationListHeaderForm
                                                      }
                                                    >
                                                      <div
                                                        className={
                                                          classes.notificationListHeaderLayout
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            classes.notificationListContentForm
                                                          }
                                                        >
                                                          <h2
                                                            className={
                                                              classes.notificationListContentContainerForm
                                                            }
                                                          >
                                                            <span
                                                              className={
                                                                classes.notificationListContentAttribute
                                                              }
                                                            >
                                                              <span
                                                                className={
                                                                  classes.notificationListContentName
                                                                }
                                                              >
                                                                Before
                                                              </span>
                                                            </span>
                                                          </h2>
                                                        </div>
                                                        <div
                                                          style={{
                                                            marginTop: '5px',
                                                            marginBottom: '5px',
                                                          }}
                                                        ></div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                className={
                                                  classes.notificationListBodyForm
                                                }
                                              >
                                                <div
                                                  className={
                                                    classes.notificationListBodyLayout
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      paddingLeft: '8px',
                                                      paddingRight: '8px',
                                                    }}
                                                  >
                                                    <div>
                                                      <a
                                                        className={
                                                          classes.notificationListTabLinkForm
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            classes.notificationListTabContainer
                                                          }
                                                        >
                                                          <div
                                                            className={
                                                              classes.notificationListTabIconForm
                                                            }
                                                          >
                                                            <div
                                                              className={
                                                                classes.notificationListTabIconFormLayout
                                                              }
                                                            >
                                                              <svg
                                                                style={{
                                                                  height:
                                                                    '56px',
                                                                  width: '56px',
                                                                }}
                                                                className={
                                                                  classes.notificationListTabIconFormAttribute
                                                                }
                                                              >
                                                                <mask>
                                                                  <circle
                                                                    cx={28}
                                                                    cy={28}
                                                                    fill="white"
                                                                    r={28}
                                                                  ></circle>
                                                                  <circle
                                                                    cx={48}
                                                                    cy={48}
                                                                    fill="white"
                                                                    r={9}
                                                                  ></circle>
                                                                </mask>
                                                                <g>
                                                                  <User
                                                                    x={0}
                                                                    y={0}
                                                                    height="100%"
                                                                    width="100%"
                                                                    preserveAspectRatio="xMinYMin slice"
                                                                    className={
                                                                      classes.notificationListTabImageAttribute
                                                                    }
                                                                  ></User>
                                                                  <circle
                                                                    cx={28}
                                                                    cy={28}
                                                                    r={28}
                                                                    className={
                                                                      classes.notificationListTabImageCircleAttribute
                                                                    }
                                                                  ></circle>
                                                                </g>
                                                              </svg>
                                                              <div
                                                                className={
                                                                  classes.notificationListContainerContentIconForm
                                                                }
                                                                style={{
                                                                  bottom: '8px',
                                                                  right: '8px',
                                                                  transform:
                                                                    'translate(50%, 50%)',
                                                                }}
                                                              >
                                                                <div
                                                                  className={
                                                                    classes.notificationListContainerContentIconLayout
                                                                  }
                                                                >
                                                                  <div
                                                                    className={
                                                                      classes.notificationListContainerContentIconAttribute
                                                                    }
                                                                    style={{
                                                                      backgroundColor:
                                                                        'transparent',
                                                                    }}
                                                                  >
                                                                    <Message
                                                                      style={{
                                                                        height:
                                                                          '28px',
                                                                        width:
                                                                          '28px',
                                                                      }}
                                                                      className={
                                                                        classes.notificationListContainerContentIconName
                                                                      }
                                                                    ></Message>
                                                                  </div>
                                                                  <div
                                                                    className={
                                                                      classes.notificationListContainerContentIconAttributeBack
                                                                    }
                                                                  ></div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div
                                                            className={
                                                              classes.notificationListTabMessageForm
                                                            }
                                                          >
                                                            <div
                                                              className={
                                                                classes.notificationListTabMessageLayout
                                                              }
                                                            >
                                                              <div>
                                                                <div
                                                                  className={
                                                                    classes.notificationListTabMessageContainerForm
                                                                  }
                                                                >
                                                                  <div
                                                                    className={
                                                                      classes.notificationListTabMessageContainerLayout
                                                                    }
                                                                  >
                                                                    <span
                                                                      className={
                                                                        classes.notificationListTabMessageContainerSize
                                                                      }
                                                                    >
                                                                      <span
                                                                        className={
                                                                          classes.notificationListTabMessageContainerAttribute
                                                                        }
                                                                        style={{
                                                                          WebkitBoxOrient:
                                                                            'vertical',
                                                                          WebkitLineClamp: 3,
                                                                          display:
                                                                            '-webkit-box',
                                                                        }}
                                                                      >
                                                                        <div
                                                                          className={
                                                                            classes.notificationListTabMessageContainerAttributeHidden
                                                                          }
                                                                        >
                                                                          Not
                                                                          Read
                                                                        </div>
                                                                        <strong>
                                                                          Ngô
                                                                          Ngyên
                                                                          Bằng
                                                                        </strong>{' '}
                                                                        đã yêu
                                                                        cầu
                                                                        mượng
                                                                        phòng{' '}
                                                                        <strong>
                                                                          {' '}
                                                                          LB12{' '}
                                                                        </strong>{' '}
                                                                        vào thứ
                                                                        Năm:
                                                                        #IDRQSR_123
                                                                        [10:00
                                                                        02/06/2022]
                                                                        Lý do:
                                                                        Mượn để
                                                                        họp.
                                                                      </span>
                                                                    </span>
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        '5px',
                                                                      marginBottom:
                                                                        '5px',
                                                                    }}
                                                                  >
                                                                    <span
                                                                      className={
                                                                        classes.notificationListTabTimeForm
                                                                      }
                                                                    >
                                                                      <span
                                                                        className={
                                                                          classes.notificationListTabTimeLayout
                                                                        }
                                                                      >
                                                                        <span
                                                                          className={
                                                                            classes.notificationListTabTimeAttribute
                                                                          }
                                                                        >
                                                                          14 giờ
                                                                          trước
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div
                                                                className={
                                                                  classes.notificationListTabBreaker
                                                                }
                                                              >
                                                                <div
                                                                  style={{
                                                                    maxWidth:
                                                                      '100%',
                                                                  }}
                                                                ></div>
                                                              </div>
                                                            </div>
                                                            <div
                                                              className={
                                                                classes.notificationListTabNoteForm
                                                              }
                                                            >
                                                              <div>
                                                                <div
                                                                  className={
                                                                    classes.notificationListTabNoteLayout
                                                                  }
                                                                >
                                                                  <span
                                                                    className={
                                                                      classes.notificationListTabNoteAttribute
                                                                    }
                                                                  ></span>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            classes.notificationListTabContainerBack
                                                          }
                                                        ></div>
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={classes.notificationLayoutFormBack}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const useStyles = createStyles({
  //--------------------------------BODY LAYOUT OUTSIDE----------------------------------//
  bodyForm: {
    fontFamily: 'Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif',
    overflowY: 'visible',
    backgroundColor: WHITE,
    WebkitFontSmoothing: 'antialiased',
    overscrollBehaviorY: 'none',
  },

  bodyLayout: {
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 0,
    display: 'block',
  },

  bodyPosition: {
    fontFamily: 'inherit',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },

  bodySize: {
    fontFamily: 'inherit',
    position: 'relative',
    minHeight: 'calc(100vh - 56px)',
    display: 'flex',
    flexDirection: 'column',
    top: '-20px',
  },

  bodyContainerForm: {
    fontFamily: 'inherit',
    position: 'relative',
    display: 'flex',
    zIndex: 0,
    minHeight: 'inherit',
    marginBottom: 'calc(-100vh + 56px)',
    flexDirection: 'column',
  },

  bodyContainerLayout: {
    fontFamily: 'inherit',
    display: 'flex',
    minHeight: 'inherit',
    flexDirection: 'column',
  },

  bodyContainerSize: {
    fontFamily: 'inherit',
    display: 'flex',
    minWidth: 0,
    minHeight: 'inherit',
    flexDirection: 'column',
    flexGrow: 1,
  },

  bodyColumn: {
    fontFamily: 'inherit',
    justifyContent: 'center',
    position: 'relative',
    minWidth: '900px',
    display: 'flex',
    zIndex: 0,
    minHeight: 'inherit',
  },

  bodyColumnBack: {
    fontFamily: 'inherit',
    display: 'none',
    position: 'relative',
    minWidth: 0,
    zIndex: 0,
    minHeight: 'inherit',
    flexDirection: 'column',
    flexGrow: 1,
  },
  //-----------------------NOTIFICATION BLOCK OUTSIDE---------------------------------------------------//
  notificationForm: {
    fontFamily: 'inherit',
    justifyContent: 'center',
    display: 'flex',
  },

  notificationSpacingHeader: {
    fontFamily: 'inherit',
    marginTop: '16px',
    zIndex: 1,
    height: '100vh',
    display: 'flex',
    backgroundColor: '#FFFFFF',
    fontSize: '.8125rem',
    minHeight: 'inherit',
    maxWidth: '100%',
    boxSizing: 'content-box',
    flexDirection: 'column',
    top: '56px',
  },

  notificationLayout: {
    fontFamily: 'inherit',
    position: 'relative',
    width: '100%',
    display: 'flex',
  },
  //-------------------------------NOTIFICATION lAYOUT OUTSIDE---------------//
  notificationLayoutForm: {
    borderRadius: 'max(0px, min(8px, ((100vw - 4px) - 100%) * 9999)) / 8px',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    fontFamily: 'inherit',
    overflowY: 'hidden',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    position: 'relative',
    width: '100%',
    backgroundColor: WHITE,
    zIndex: 0,
  },

  notificationLayoutFormBack: {
    backgroundRepeat: 'repeat-y',
    backgroundSize: '6px 1px',
    position: 'absolute',
    width: '6px',
    transitionDuration: '200ms',
    backgroundImage:
      'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYA…gYAZiEGACYhCbvba2Vg0ABVQBrt7JOT8AAAAASUVORK5CYII=)',
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
    transitionTimingFunction: 'cubic-bezier(.08,.52,.52,1)',
    left: '-5px',
  },

  notificationLayoutSize: {
    fontFamily: 'inherit',
    display: 'flex',
    backgroundColor: WHITE,
    maxWidth: 'calc(100vw - 24px)',
    minHeight: 'inherit',
    flexDirection: 'column',
  },

  notificationLayoutPosition: {
    fontFamily: 'inherit',
    minHeight: 0,
    perspectiveOrigin: 'right top',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '1px',
    transformStyle: 'preserve-3d',
    willChange: 'transform,scroll-position',
    display: 'flex',
    flexShrink: 1,
    overflowY: 'auto',
    zIndex: 0,
    flexBasis: '100%',
    flexDirection: 'column',
    overscrollBehaviorY: 'contain',
    flexGrow: 1,
  },

  //--------------------------------NOTIFICATION CONTAINER-----------------------------------//
  notificationContainer: {
    fontFamily: 'inherit',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },

  notificationContainerBack: {
    fontFamily: 'inherit',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '1px',
    display: 'block',
  },

  //------------------------------------NOTIFICATION HEADER------------------------------------------------//
  notificationHeaderForm: {
    fontFamily: 'inherit',
    margin: '20px 16px 12px 16px',
    boxSizing: 'border-box',
    flexShrink: 0,
    flexWrap: 'nowrap',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationHeaderLayout: {
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    flexBasis: '0px',
    position: 'relative',
    display: 'flex',
    minWidth: 0,
    flexShrink: 1,
    zIndex: 0,
    maxWidth: '100%',
    flexDirection: 'column',
    flexGrow: 1,
  },

  notificationHeaderBoxSize: {
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    flexShrink: 0,
    flexWrap: 'nowrap',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  //------------------------------------NOTIFICATION HEADER CONTENT------------------------------------------------//
  notificationHeaderContentForm: {
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    flexBasis: 'auto',
    position: 'relative',
    minWidth: 0,
    flexShrink: 1,
    zIndex: 0,
    maxWidth: '100%',
    flexGrow: 1,
    display: 'block',
  },

  notificationHeaderContentLayout: {
    fontFamily: 'inherit',
    marginBottom: '-7px',
    marginTop: '-7px',
    display: 'flex',
    flexDirection: 'column',
  },

  notificationHeaderContentSize: {
    fontFamily: 'inherit',
    marginBottom: '7px',
    marginTop: '7px',
    display: 'block',
  },

  notificationHeaderContentAttribute: {
    fontFamily: 'inherit',
    //wordBreak: 'break-word',
    color: BLACK,
    fontSize: '1.5rem',
    textAlign: 'left',
    minWidth: 0,
    fontWeight: 700,
    lineHeight: 1.1667,
    maxWidth: '100%',
    //wordWrap: 'break-word',
    display: 'block',
    unicodeBidi: 'isolate',
  },

  notificationHeaderContentName: {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    outline: 'none',
  },
  //--------------------------------NOTIFICATION HEAEDER ICON-------------------------------------//
  notificationHeaderButtonForm: {
    fontFamily: 'inherit',
    justifyContent: 'center',
    boxSizing: 'border-box',
    flexShrink: 0,
    flexBasis: 'auto',
    position: 'relative',
    flexGrow: 0,
    display: 'flex',
    minWidth: '100%',
    flexDirection: 'column',
    maxHeight: '17px',
    alignItems: 'flex-end',
  },

  notificationHeaderButtonLayout: {
    fontFamily: 'inherit',
    flexShrink: 0,
    display: 'flex',
  },

  notificationHeaderButtonSize: {
    fontFamily: 'inherit',
    marginTop: '-8px',
    marginBottom: '-8px',
    display: 'flex',
  },

  notificationHeaderButtonAttribute: {
    fontFamily: 'inherit',
    justifyContent: 'center',
    borderRadius: '50%',
    padding: 0,
    margin: 0,
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
    position: 'relative',
    height: '32px',
    display: 'flex',
    textAlign: 'inherit',
    backgroundColor: 'transparent',
    touchAction: 'manipulation',
    width: '32px',
    alignItems: 'center',
    WebkitUserSelect: 'none',
    borderWidth: 0,
    border: 0,
    listStyle: 'none',
    outline: 'none',
    textDecoration: 'none',
  },

  notificationHeaderIconAttribute: {
    backgroundImage:
      'url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/c1SM8kb7vI5.png)',
    backgroundPosition: '-147px -67px',
    backgroundSize: 'auto',
    width: '20px',
    height: '20px',
    backgroundRepeat: 'no-repeat',
    display: 'inline-block',
    WebkitFilter:
      'invert(39%) sepia(21%) saturate(200%) saturate(109.5%) hue-rotate(174deg) brightness(94%) contrast(86%)',
    verticalAlign: '-0.25em',
  },

  notificationHeaderIconBack: {
    fontFamily: 'inherit',
    borderRadius: '50%',
    position: 'absolute',
    transitionTimingFunction: 'cubic-bezier(0, 0, 1, 1)',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    transitionDuration: '100ms',
    opacity: 0,
    transitionProperty: 'opacity',
  },
  //------------------------------------NOTIFICATION FILTER------------------------------------------------//
  notificationFilterForm: {
    flexShrink: 0,
    flexWrap: 'wrap',
    display: 'flex',
    paddingLeft: '16px',
    flexDirection: 'row',
  },
  //----------------------------------------NOTIFICATION FILTER BUTTON-----------------------------------------//
  notificationFilterButtonForm: {
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    paddingRight: '8px',
    height: '100%',
  },

  notificationFilterButtonLayout: {
    fontFamily: 'inherit',
    paddingLeft: '12px',
    height: '36px',
    justifyContent: 'center',
    boxSizing: 'border-box',
    paddingBottom: 0,
    borderRadius: '18px',
    marginBottom: 0,
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
    position: 'relative',
    marginTop: 0,
    width: '100%',
    paddingTop: 0,
    display: 'flex',
    textAlign: 'inherit',
    marginLeft: 0,
    touchAction: 'manipulation',
    paddingRight: '12px',
    marginRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
    WebkitUserSelect: 'none',
    border: 0,
    listStyle: 'none',
    outline: 'none',
    textDecoration: 'none',
  },

  notificationFilterButtonAttribute: {
    fontFamily: 'inherit',
    wordBreak: 'break-word',
    fontWeight: 600,
    fontSize: '0.9375rem',
    minWidth: 0,
    maxWidth: '100%',
    wordWrap: 'break-word',
    display: 'block',
    lineHeight: 1.3333,
    unicodeBidi: 'isolate',
  },

  notificationFilterButtonName: {
    fontFamily: 'inherit',
    overflowY: 'hidden',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    position: 'relative',
    whiteSpace: 'nowrap',
    display: 'block',
  },

  notificationFilterButtonAttributeBack: {
    borderRadius: '18px',
    position: 'absolute',
    transitionTimingFunction: 'cubic-bezier(0, 0, 1, 1)',
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    pointerEvents: 'none',
    transitionDuration: '100ms',
    opacity: 0,
    transitionProperty: 'opacity',
  },

  //-----------------------------NOTIFICATION lIST----------------------------------------------//
  notificationListForm: {
    alignContent: 'inherit',
    maxHeight: 'inherit',
    flexGrow: 'inherit',
    flexShrink: 'inherit',
    position: 'relative',
    width: 'inherit',
    minHeight: 'inherit',
    minWidth: 'inherit',
    justifyContent: 'inherit',
    height: 'inherit',
    display: 'inherit',
    alignItems: 'inherit',
  },

  notificationListLayout: {
    boxSizing: 'inherit',
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    zIndex: 0,
    maxWidth: '100%',
    flexDirection: 'column',
    paddingTop: '20px',
  },

  //-------------------------------NOTIFICATION LIST HEADER-------------------------------------//
  notificationListHeaderForm: {
    minHeight: 0,
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    zIndex: 0,
    flexDirection: 'column',
    flexGrow: 1,
  },

  notificationListHeaderLayout: {
    boxSizing: 'border-box',
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    paddingRight: '16px',
    zIndex: 0,
    paddingLeft: '16px',
    maxWidth: '100%',
    flexDirection: 'column',
  },

  //----------------------------------NOTIFICATION LIST CONTENT---------------------------------------//

  notificationListContentForm: {
    display: 'flex',
    marginTop: '-5px',
    marginBottom: '-5px',
    flexDirection: 'column',
  },

  notificationListContentLayout: {
    marginTop: '5px',
    marginBottom: '5px',
  },

  notificationListContentContainerForm: {
    fontWeight: 'inherit',
    fontSize: 'inherit',
    minWidth: 0,
    color: 'inherit',
    maxWidth: '100%',
    outline: 'none',
  },

  notificationListContentAttribute: {
    wordBreak: 'break-word',
    color: BLACK,
    fontWeight: 600,
    textAlign: 'left',
    minWidth: 0,
    lineHeight: 1.1765,
    maxWidth: '100%',
    wordWrap: 'break-word',
    display: 'block',
    fontSize: '1.0625rem',
    unicodeBidi: 'isolate',
  },

  notificationListContentName: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    overflowY: 'hidden',
    paddingBottom: '1px',
    overflowX: 'hidden',
    position: 'relative',
  },

  //-----------------------------------NOTIFICATION LIST BODY----------------------------------//
  notificationListBodyForm: {
    position: 'relative',
  },

  notificationListBodyLayout: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },

  //-----------------------------------NOTIFICATION lIST TAB  ------------------------------------//
  notificationListTabLinkForm: {
    borderRadius: '8px',
    minHeight: '0',
    padding: 0,
    boxSizing: 'border-box',
    margin: 0,
    flexShrink: 0,
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
    flexBasis: 'auto',
    position: 'relative',
    textAlign: 'inherit',
    backgroundColor: 'transparent',
    touchAction: 'manipulation',
    zIndex: 0,
    marginRight: 0,
    flexDirection: 'row',
    WebkitUserSelect: 'none',
    display: 'block',
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 0,
    borderStyle: 'solid',
    listStyle: 'none',
    outline: 'none',
    textDecoration: 'none',
  },

  notificationListTabContainer: {
    paddingLeft: '8px',
    boxSizing: 'border-box',
    paddingBottom: 0,
    marginBottom: 0,
    minHeight: '44px',
    position: 'relative',
    marginTop: 0,
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 0,
    marginLeft: 0,
    flexShrink: 1,
    zIndex: 0,
    paddingRight: '8px',
    marginRight: 0,
    flexGrow: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 0,
  },
  //---------------------------NOTIFICATION LIST TAB ICON----------------------------------//
  notificationListTabIconForm: {
    marginRight: '12px',
    alignSelf: 'flex-start',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
    marginTop: '8px',
  },

  notificationListTabIconFormLayout: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    position: 'relative',
    zIndex: 0,
  },

  notificationListTabIconFormAttribute: {
    verticalAlign: 'bottom',
    overflow: 'hidden',
  },

  notificationListTabImageAttribute: {
    height: '56px',
    width: '56px',
  },

  notificationListTabImageCircleAttribute: {
    strokeWidth: 2,
    fill: 'none',
    stroke: 'rgba(0, 0, 0, 0.1)',
  },

  notificationListContainerContentIconForm: {
    borderRadius: '50%',
    position: 'absolute',
    zIndex: 2,
  },

  notificationListContainerContentIconLayout: {
    alignContent: 'inherit',
    borderRadius: 'inherit',
    position: 'relative',
    flexDirection: 'inherit',
    width: 'inherit',
    justifyContent: 'inherit',
    height: 'inherit',
    display: 'inherit',
    alignItems: 'inherit',
  },

  notificationListContainerContentIconAttribute: {
    minHeight: 0,
    justifyContent: 'center',
    overflowY: 'hidden',
    borderRadius: '50%',
    paddingRight: 0,
    boxSizing: 'border-box',
    paddingBottom: 0,
    marginBottom: 0,
    overflowX: 'hidden',
    marginTop: 0,
    paddingTop: 0,
    display: 'flex',
    minWidth: 0,
    marginLeft: 0,
    flexShrink: 1,
    zIndex: 0,
    marginRight: 0,
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    paddingLeft: 0,
    borderWidth: 0,
    borderStyle: 'solid',
  },

  notificationListContainerContentIconName: {
    verticalAlign: '-0.25em',
    objectFit: 'cover',
  },

  notificationListContainerContentIconAttributeBack: {
    borderRadius: '50%',
    position: 'absolute',
    transitionTimingFunction: 'cubic-bezier(0, 0, 1, 1)',
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    pointerEvents: 'none',
    transitionDuration: '200ms',
    opacity: 0,
    transitionProperty: 'opacity',
  },

  notificationListTabMessageForm: {
    minHeight: 0,
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 0,
    flexShrink: 1,
    zIndex: 0,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 0,
  },

  notificationListTabMessageLayout: {
    minHeight: 0,
    padding: '12px 0px 12px l',
    boxSizing: 'border-box',
    flexBasis: '0px',
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 0,
    alignItems: 'stretch',
    flexShrink: 1,
    zIndex: 0,
    flexDirection: 'column',
    flexGrow: 1,
    borderStyle: 'solid',
    borderWidth: 0,
  },

  notificationListTabMessageContainerForm: {
    display: 'flex',
    marginTop: '-5px',
    marginBottom: '-5px',
    flexDirection: 'column',
  },

  notificationListTabMessageContainerLayout: {
    marginTop: '5px',
    marginBottom: '5px',
  },

  notificationListTabMessageContainerSize: {
    wordBreak: 'break-word',
    color: BLACK,
    fontFamily: 'inherit',
    fontSize: '0.9375rem',
    textAlign: 'left',
    minWidth: 0,
    maxWidth: '100%',
    wordWrap: 'break-word',
    fontWeight: 400,
    display: 'block',
    lineHeight: 1.3333,
    unicodeBidi: 'isolate',
  },

  notificationListTabMessageContainerAttribute: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative',
  },

  notificationListTabMessageContainerAttributeHidden: {
    clip: 'rect(0,0,0,0)',
    position: 'absolute',
    clipPath: 'polygon(0 0,0 0,0 0,0 0)',
    wordBreak: 'keep-all',
  },

  notificationListTabTimeForm: {
    wordBreak: 'break-word',
    color: '#8A8D91',
    lineHeight: 1.2308,
    textAlign: 'left',
    minWidth: 0,
    fontSize: '.8125rem',
    maxWidth: '100%',
    wordWrap: 'break-word',
    fontWeight: 400,
    display: 'block',
  },

  notificationListTabTimeLayout: {
    overflowY: 'hidden',
    paddingBottom: '1px',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    position: 'relative',
    whiteSpace: 'nowrap',
    display: 'block',
  },

  notificationListTabTimeAttribute: {
    wordBreak: 'break-word',
    color: ' hsl(214, 89%, 52%)',
    fontWeight: 600,
    lineHeight: 1.2308,
    minWidth: 0,
    fontSize: '0.8125rem',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },

  notificationListTabBreaker: {
    display: 'flex',
    marginLeft: '-12px',
    flexDirection: 'column',
    marginRight: '-12px',
  },

  notificationListTabNoteForm: {
    marginLeft: '12px',
    alignSelf: 'center',
    position: 'relative',
    marginBottom: '8px',
    marginTop: '8px',
  },

  notificationListTabNoteLayout: {
    minHeight: 0,
    justifyContent: 'center',
    paddingRight: 0,
    boxSizing: 'border-box',
    borderRadius: 'inherit',
    flexShrink: 0,
    width: '20px',
    WebkitTapHighlightColor: 'transparent',
    flexBasis: 'auto',
    height: '48px',
    position: 'relative',
    marginTop: 0,
    paddingTop: 0,
    textAlign: 'inherit',
    minWidth: 0,
    marginLeft: 0,
    backgroundColor: 'transparent',
    touchAction: 'manipulation',
    zIndex: 0,
    marginRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '4px',
    WebkitUserSelect: 'none',
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 0,
    borderStyle: 'solid',
    listStyle: 'none',
    outline: 'none',
    textDecoration: 'none',
  },

  notificationListTabNoteAttribute: {
    borderRadius: '50%',
    display: 'inline-flex',
    backgroundColor: 'hsl(214, 89%, 52%)',
    width: '12px',
    height: '12px',
    border: 0,
  },

  notificationListTabContainerBack: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 'inherit',
    position: 'absolute',
    transitionTimingFunction: 'cubic-bezier(0, 0, 1, 1)',
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    pointerEvents: 'none',
    transitionDuration: '100ms',
    opacity: 0,
    transitionProperty: 'opacity',
  },
});

export default NotificationManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      assa: null,
    },
  };
};
